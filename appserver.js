if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express=require("express");//npm i express
const app=express();  

const mongoose=require("mongoose");   //used to connect to database, npm i mongoose
const bodyParser = require("body-parser");
const path=require("path");
const methodOverride=require("method-override"); //npm i method-override
const ejsMate=require("ejs-mate");   //npm i ejs-mate
const ExpressError=require("./utilis/ExpressError.js");
const session=require("express-session");  //npm i express-session
const MongoStore = require("connect-mongo"); //npm i connect-mongo phase-3 part d
const flash=require("connect-flash"); //npm i  connect flash

const passport=require("passport");// npm i passport
const LocalStrategy=require("passport-local");// npm i passport-local
const User=require("./models(schema)/user.js");

const dbUrl = process.env.DBATLAS_URL;
// const URL = "mongodb://127.0.0.1:27017/wanderlust";




const listingRouter=require("./Routes/listing.js");
const reviewRouter=require("./Routes/reviews.js");
const userRouter=require("./Routes/user.js");



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});
store.on("error", ()=>{
    console.log("ERROR IN MONGO-SESSION STORE", err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,  //1 second = 1000 millisec
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());                        
app.use(passport.session());                           
passport.use(new LocalStrategy(User.authenticate()));  
                                                          
passport.serializeUser(User.serializeUser());          
passport.deserializeUser(User.deserializeUser()); 



//middleware to define our locals
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");   //flash middleware must be before routers
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;  //we can't access the req.user in ejs template in navbar for signup,login and logout...
    next();
})




//routers
app.use("/listings",listingRouter);
app.use("/listings/:id",reviewRouter);
app.use("/",userRouter);





app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});  //agr inn routes k alawa kahin request aata h to page not found

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("./listings/error.ejs",{message});   ///custom eror handler
});




let port=8000;
app.listen(port,(req,res)=>{
    console.log(`listening on port ${port}`);
});

connectionToServer().then((res)=>{
    console.log("connection with database is successful");
}).catch((err)=>{
    console.log(err);
});

async function connectionToServer(){
        await mongoose.connect(dbUrl);
}

















// app.get("/testlisting", async (req,res) => {
//     // let sampleListing=new listing({
//     //     title:"my villa",
//     //     price:10000,
//     //     country:"india",
//     // });
//     // await sampleListing.save();   //use thenPromise or asynce/await keyword both r same....
//     res.send("port is working");
// });
