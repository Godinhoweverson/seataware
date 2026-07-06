const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const routeRoutes = require("./routes/routeRoutes");
const dashboardRoutes = require("./routes/getdashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;