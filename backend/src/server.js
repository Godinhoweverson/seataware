require("dotenv").config();
require("./config/db");
const app = require("./app");
const express = require("express");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use(express.json())