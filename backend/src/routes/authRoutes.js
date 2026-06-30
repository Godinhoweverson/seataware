const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);


//Temporarily route to test

const verifyToken = require("../middleware/authMiddleware");

router.get("/profile", verifyToken, (req, res) =>{
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });     

});

module.exports = router;