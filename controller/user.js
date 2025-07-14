const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { router } = require("../routes/user");
const User = require("../models/user.js");

module.exports.Signup = async( req, res,next ) => {
    try {
        let {username,email,password} = req.body;
    const newUser = new User ({email,username});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err) => {
        if(err) {
        return next(err);
        }
        req.flash("success" , "welcome to wanderlust ");
        res.redirect("/listings");
    })
    
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.Login = async(req,res) => {
    req.flash("success","welcome back to Wanderlust ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.Logout = (req,res,next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","You have been logged out! ");
        res.redirect("/listings");
    });
}