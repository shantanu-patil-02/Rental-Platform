const express = require("express");
const router=express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require('../models/review');  
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");
const { CreataReview } = require("../controller/reviews.js");
const ReviewController = require("../controller/reviews.js");

//review post request 

router.post("/",isLoggedIn,ReviewController.CreataReview );

//delete route of review

router.delete("/:reviewID",isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.DeleteReview));

module.exports = router;