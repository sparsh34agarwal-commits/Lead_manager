const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const leadcontroller = require("../controllers/lead.controller");


// Every route below this line requires authentication
router.use(authMiddleware);


router.post("/", leadcontroller.createLead);
router.get("/", leadcontroller.getLeads);
router.put("/:id", leadcontroller.updateLead);
router.delete("/:id", leadcontroller.deleteLead);


module.exports = router;