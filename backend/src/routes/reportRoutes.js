const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { report, getReport, getReports,UpdateReport, deleteReport, updateReportStatus } = require("../controllers/reportController");

const router = express.Router();

router.post("/", verifyToken, report);
router.get("/", getReports);
router.get("/:report_id",getReport);
router.put("/:report_id", verifyToken, UpdateReport);
router.delete("/:report_id", verifyToken, deleteReport);
router.patch("/:report_id/status", verifyToken, updateReportStatus);

module.exports = router;