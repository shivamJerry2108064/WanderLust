const express=require("express");
const router=express.Router({mergeParams:true}); 
const asyncWrap=require("../utilis/asyncWrap.js");
const User=require("../models(schema)/user.js");
const passport=require("passport");// npm i passport
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");

router.route("/signup")
.get(userController.getSignup)
.post(asyncWrap(userController.postReqToSignUp));

router.route("/login")
.get(userController.getLogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.postReqToLogin);

router.get("/logout",userController.logout);


module.exports=router;