const Listing = require("../models/listing");;
const { router } = require("../routes/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.newRenderForm = (req,res) => {
    res.render("listings/new");
}

module.exports.index = async (req,res) => {
        let allListing = await Listing.find({});
        res.render("listings/index",{allListing});
}

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    let showdata = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },

    }).populate("owner");
    if (!showdata){
        req.flash("error"," Listing you requested for does not exist ! ");
        res.redirect("/listings");
    }
    res.render("listings/show", { showdata });
}

module.exports.CreateListings = async (req,res) => {
     let url=req.file.path;
     let filename = req.file.filename;
     
    const newListing=new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New Listing Created! ");
    res.redirect("/listings");

}

module.exports.EditListings = async (req, res) => {
    let { id } = req.params;
    let editdata = await Listing.findById(id);
    if (!editdata){
        req.flash("error"," Listing you requested for does not exist ! ");
        res.redirect("/listings");
    }
    let originalImageUrl = editdata.image.url;
    originalImageUrl =  originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit", { editdata,originalImageUrl });
}

module.exports.UpdateListings = async (req, res) => {

    let { id } = req.params;
   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if(typeof req.file !== "undefined"){
   let url=req.file.path;
   let filename = req.file.filename;
   listing.image = {url , filename };
   await listing.save();
   }
    req.flash("success"," Listing Updated ! ");
    res.redirect(`/listings/${id}`);
}

module.exports.DeleteListings = async (req, res) => {
    let { id } = req.params;
    let deldata = await Listing.findByIdAndDelete(id);
    if (!deldata) throw new ExpressError(404, "Listing not found!");
    req.flash("success","  Listing Deleted ! ");
    res.redirect("/listings");
}