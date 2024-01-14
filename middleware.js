const Listing=require("./models(schema)/listing.js");
const ExpressError=require("./utilis/ExpressError.js");  //for validateListing and validateReview
const {listingSchema}=require("./serverSideValidation.js");
const {reviewSchema}=require("./serverSideValidation.js");//for validateListing and validateReview
const Review=require("./models(schema)/review.js");

module.exports.validateListing=(req,res,next)=>{  //valiateListing middleware
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{  //valiateListing middleware
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req.user); //req.user tells us whether the user logged in or not , if not then req.user obj is undefined..
    if(!req.isAuthenticated()){     //req.isauthenticated is a method of password that ensured whether the user is logged in...
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","please login/signup first to access further information...");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{  //middleware 
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

//authorization
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you'r not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewer=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.reviewer.equals(res.locals.currUser._id)){
        req.flash("error","you'r not the creator of this review");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};

