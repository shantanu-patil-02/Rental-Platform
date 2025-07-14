const express = require("express");
const router = express.Router();
exports.router = router;
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}  = require("../middleware.js");
const UserController = require("../controller/user.js");

//signup
router.route("/signup")
.get((req,res ) => { res.render("users/signup.ejs");})
.post(wrapAsync(UserController.Signup));

router.route("/login")
.get((req,res) => {res.render("users/login.ejs")})
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),UserController.Login);

router.get("/logout",UserController.Logout);

module.exports= router;