const mongoose = require("mongoose");
require("dotenv").config();

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To Database");
    }
    catch(err){
        console.log("Coudn't connect To The Server", err);
    }
}

module.exports=connectDB;