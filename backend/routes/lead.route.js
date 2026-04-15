const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadLeads, getLeads, generateEmailForLead, getLeadInsights } = require("../controllers/lead.controller");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/upload", authMiddleware, upload.single("file"), uploadLeads);
router.get("/", authMiddleware, getLeads);
router.get("/insights", authMiddleware, getLeadInsights)
router.post("/generate/:id", authMiddleware, generateEmailForLead);

module.exports = router;