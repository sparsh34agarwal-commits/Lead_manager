const express = require("express");
const app = require("./src/app");
const connectDB=require("./src/Database/db");

app.listen(3000, ()=>{
    console.log("Server Connected On Port 3000");  
})

connectDB();
