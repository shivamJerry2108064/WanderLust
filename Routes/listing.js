
const express=require("express");
const router=express.Router();  //important
const Listing=require("../models(schema)/listing.js");
const asyncWrap=require("../utilis/asyncWrap.js");
const {isLoggedIn,validateListing,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listing.js");


const multer=require("multer"); //npm i multer and multer parses the file data sended by user and send it to backend to save it in database... 
//multer always parse the data of enctype=multipart-formdata!...

const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(asyncWrap(listingController.alllistings))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,asyncWrap(listingController.postReqToAddListing));


router.get("/new",isLoggedIn,listingController.forNewListing);
router.get("/voucher",isLoggedIn,asyncWrap(listingController.forVoucher));
router.get("/survey",asyncWrap(listingController.forSurvey));

router.get("/trending",asyncWrap(listingController.trendingListing));
router.get("/mountain",asyncWrap(listingController.mountainListing));
router.get("/farms",asyncWrap(listingController.farmsListing));
router.get("/snowflakes",asyncWrap(listingController.snowflakesListing));
router.get("/castles-forts",asyncWrap(listingController.castles_fortsListing));
router.get("/gardens",asyncWrap(listingController.gardensListing));
router.get("/amusements",asyncWrap(listingController.amusementsListing));
router.get("/seashores",asyncWrap(listingController.seashoresListing));
router.get("/cities",asyncWrap(listingController.cityListing));

router.route("/:id")
.get(asyncWrap(listingController.showListing))
.put(isLoggedIn, isOwner,upload.single("listing[image]") ,validateListing,asyncWrap(listingController.putReqToEditListing))
.delete(isLoggedIn, isOwner,asyncWrap(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn,isOwner,asyncWrap(listingController.getReqToEditListing));

router.get("/:id/location",isLoggedIn,asyncWrap(listingController.locationListing));
router.get("/search", asyncWrap(listingController.searchListing));





module.exports=router;