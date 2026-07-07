const express = require("express");
const {getDashBoardStats, latestReports} = require("../controllers/dashboardController");

const router = express.Router();
router.get("/stats", getDashBoardStats);
router.get("/latest-reports", latestReports);
module.exports = router;

