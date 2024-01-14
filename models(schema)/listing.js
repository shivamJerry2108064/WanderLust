const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,

    groupname:{
        type:String,
        enum:["mountain","trending","farms","snowflakes","castles/forts","gardens","amusements","cities","seaShores"]
        
        
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",  //owner is the registered user...
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },
});



listingSchema.post("findOneAndDelete",async(listing)=>{   //post middleware-agr koi listing delete hori h to uske sath uske review bhi delete kre
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }

});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
