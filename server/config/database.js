const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("MongoDB Connected Successfully"))
    .catch((error)=>{
        console.log("MongoDB Connection Error: ", error);
        console.error(error);
        process.exit(1);
    });
};