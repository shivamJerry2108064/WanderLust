
const express=require("express");
const router=express.Router({mergeParams:true}); 
const asyncWrap=require("../utilis/asyncWrap.js");
const Review=require("../models(schema)/review.js");
const Listing=require("../models(schema)/listing.js");
const {isLoggedIn,validateReview,isReviewer}=require("../middleware.js");
const {reviewSchema}=require("../serverSideValidation.js");
const reviewController=require("../controllers/reviews.js");



router.get("/reviewForm",isLoggedIn,asyncWrap(reviewController.getReviewForm));


router.post("/reviews" , isLoggedIn,validateReview, asyncWrap(reviewController.postReqToAddReview));

router.delete("/reviews/:reviewId",isLoggedIn,isReviewer,asyncWrap(reviewController.deleteReview));


module.exports=router;


