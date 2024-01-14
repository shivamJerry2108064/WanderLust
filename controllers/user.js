const User=require("../models(schema)/user.js");
const Listing=require("../models(schema)/listing");
const Review=require("../models(schema)/review");

module.exports.getSignup=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.postReqToSignUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{   //quick login after signup
        if(err){
            return next(err);
        }
        req.flash("success",`Hey ${registeredUser.username}! Welcome To Wanderlust!`);
    res.redirect("/listings");
    });
    
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.getLogin=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.postReqToLogin=async(req,res)=>{
    req.flash("success",` hey ${req.user.username}! welcome to wanderlust!`);
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{  //req.logout is a method of passport..
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
}