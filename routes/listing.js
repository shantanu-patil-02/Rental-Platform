const express = require("express");
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const ListingController = require("../controller/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get(wrapAsync(ListingController.index))
    .post(
        isLoggedIn
        ,upload.single('listing[image]'),
        wrapAsync(ListingController.CreateListings));
    

//new route
router.get("/new",isLoggedIn,ListingController.newRenderForm);

router
    .route("/:id")
    .get( wrapAsync(ListingController.showListings))
    .put(isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
         wrapAsync(ListingController.UpdateListings))
    .delete(isLoggedIn,isOwner, wrapAsync(ListingController.DeleteListings));

    //edit route 
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingController.EditListings));

module.exports = router;
