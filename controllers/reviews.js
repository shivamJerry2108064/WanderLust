//controllers contain the core functionality of backend...
const Listing=require("../models(schema)/listing");
const Review=require("../models(schema)/review");
const {reviewSchema}=require("../serverSideValidation.js");

module.exports.getReviewForm=async(req,res)=>{
    let {id}=req.params;
    let reviewForm=await Listing.findById(id);
    res.render("./listings/reviewForm.ejs",{reviewForm});
}

module.exports.postReqToAddReview=async (req,res)=>{
    let listing =await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);  //review[rating] & review[comment] wala review obj jp post request se yaha aaiga and also review of server side validation
    newReview.reviewer=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");

    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});  //find all the reviewId and pull them for delete 
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," your Review deleted");
    res.redirect(`/listings/${id}`);  //only reviews are deleted for a particular listing , agr listing del  kre to sarre reviews bi delete hojai to uske liye we use post middleware 
}