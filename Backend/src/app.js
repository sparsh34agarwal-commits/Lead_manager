const express = require("express");
const authroutes=require("./routes/auth.routes");
const leadroutes = require("./routes/lead.routes");
const cookieParser=require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/leads", leadroutes);


module.exports=app;