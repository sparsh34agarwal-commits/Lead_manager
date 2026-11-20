const express = require("express");
const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"]
    },
    pass:{
        type:String,
        required:true,
        trim:true,
    }
},
{
    timestamps:true
})

const userModel=mongoose.model("user",userSchema);


module.exports=userModel;