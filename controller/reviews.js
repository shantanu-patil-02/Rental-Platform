const Listing = require("../models/listing.js");
const Review = require('../models/review');  


module.exports.CreataReview = async(req,res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success"," Review Added ! ");
    res.redirect(`/listings/${listing._id}`);
   
}

module.exports.DeleteReview = async (req, res) => {
    const { id, reviewID } = req.params; 
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findByIdAndDelete(reviewID);
    req.flash("success","Review Deleted ! ");
     res.redirect(`/listings/${id}`)
}