const express = require("express");
const {getDashBoardStats} = require("../controllers/dashboardController");

const router = express.Router();
router.get("/stats", getDashBoardStats);

module.exports = router;

