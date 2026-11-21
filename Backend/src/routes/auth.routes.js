const express = require("express");
const router=express.Router();
const authcontroller=require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/me", authMiddleware, authcontroller.getMe);
router.post("/register",authcontroller.register);
router.post("/login",authcontroller.login);
router.post("/logout", authcontroller.logout);


module.exports=router;