const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You have to login to create a Listing! ");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner =async (req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id)){
        req.flash("error","You are not the owner of this listing ");
       return res.redirect(`/listings/${id}`)
    }
   next();

};

module.exports.isReviewAuthor =async (req,res,next) => {
    let { id, reviewID } = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","You are not the Author of this Review ");
       return res.redirect(`/listings/${id}`)
    }
   next();

};

