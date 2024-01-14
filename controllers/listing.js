//controllers contain the core functionality of backend...

const Listing=require("../models(schema)/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.alllistings=async (req,res)=>{
    let alllistings=await Listing.find({});
    res.render("./listings/list.ejs",{alllistings});
}

module.exports.searchListing = async(req,res) =>{
    const {query} = req.query;

    try{
        const filteredListings = await Listing.find({
            $or :[
                {title: {$regex : query, $options: "i"}},
                {description : {$regex : query , $options : "i"}},
            ],

            
        });
        if(filteredListings.length === 0){
            req.flash("error" , "no places found!");
            res.redirect("/listings");
        }else{
            res.render("./listings/list.ejs" , {filteredListings});

        }
        
    }catch(e){
        console.log(e);
        res.status(500).send("internal server error");
    }
}

module.exports.forNewListing=(req,res)=>{
    res.render("./listings/new.ejs");   //./listings is a ejs folder in views folder..
}

module.exports.forVoucher = (req,res)=>{
    res.render("./listings/voucher.ejs");
}

module.exports.forSurvey = (req,res) =>{
    res.render("./listings/survey.ejs");
}



module.exports.showListing=async (req,res)=>{  //read route 
    let {id}=req.params;
    let indiv_Listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"reviewer"}}).populate("owner");   //nested populate(last video phase2 part e)
    if(!indiv_Listing){
        req.flash("error","Listing you are requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(indiv_Listing);
    res.render("./listings/show_Individual.ejs",{indiv_Listing});
}

module.exports.postReqToAddListing=async (req,res,next)=>{   //  /new route form details post req at /listings

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();
        // console.log(response.body.features[0].geometry);
        

    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url, ".." , filename);
    
    const newListing=new Listing(req.body.listing);  //"listing of name attribute is req.body.listing" and  added in collection new "listing"

    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;

    let savedListing=await newListing.save();
    // console.log(savedListing);

    req.flash("success","New Listing Created");
    res.redirect("/listings");

}

module.exports.trendingListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "trending"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}

module.exports.seashoresListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "seaShores"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}
module.exports.amusementsListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "amusements"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}
module.exports.gardensListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "gardens"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}
module.exports.castles_fortsListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "castles/forts"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}
module.exports.snowflakesListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "snowflakes"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}
module.exports.farmsListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "farms"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}
module.exports.mountainListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "mountain"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}

module.exports.cityListing = async(req,res) =>{
    try{
        // const {id} = req.params;
       
        let groupListing = await Listing.find({groupname : "cities"});
        res.render("./listings/groupWise_list.ejs",{groupListing});
    }catch(e){
        console.log(e);
        
    }
}

module.exports.getReqToEditListing=async (req,res)=>{ //owner hai tabhi form render kro and then put req to edit and update 
    let {id}=req.params;
    const edit_Listing= await Listing.findById(id); //id extracted from indiv_Listing by using req.params & stored in edit_Listing 
    
    if(!edit_Listing){
        req.flash("error","Listing you are requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl= edit_Listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{edit_Listing,originalImageUrl});
}

module.exports.putReqToEditListing=async (req,res)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();
    
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});   //req,body.listing me listing me update krdo

    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
            listing.image={url,filename}; //req.file se jo image aai usse update krdo....
            await listing.save();
    }
    listing.geometry=response.body.features[0].geometry;
    await listing.save();

    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    let deletedList=await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect("/listings");  //ispe call aate hi listing delete hoga aur post mongoose middleware p call jaiga ki ab iss listing se related review delete krdo
}

module.exports.locationListing=async (req,res)=>{ 
    let {id}=req.params;
    let locationListing=await Listing.findById(id).populate("owner");  
    if(!locationListing){
        req.flash("error","Listing you are requested for does not exist!");
        res.redirect("/listings/show_Individual.ejs");
    }
    
    res.render("./listings/location.ejs",{locationListing});
}




