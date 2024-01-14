//some piece of code that can access clodinary before uploading image......


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})  //key are bydefault used as cloud_name,api_key,api_secret...


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_develop',
      allowedFormats: ["png","jpg","jpeg"], // supports promises as well
    },
  });

  module.exports={
    cloudinary,storage,
  };