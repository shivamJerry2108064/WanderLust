const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models(schema)/listing.js");

connectionToServer().then((res)=>{
    console.log("connection with database is successful");
}).catch((err)=>{
    console.log(err);
});

async function connectionToServer(){
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

let initDb=async (req,res)=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"65618a9e78368af59a048171"}));
    await listing.insertMany(initData.data);
    console.log("data inserted successfully");
    
};
initDb();

