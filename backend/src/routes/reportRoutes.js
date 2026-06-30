const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { report } = require("../controllers/reportController");

const router = express.Router();

router.post("/", verifyToken, report);

module.exports = router;