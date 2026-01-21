const express = require("express");
const { Signup, sendOtp } = require("../controllers/Auth");
const router = express.Router();

router.post('/signup',sendOtp,Signup);

module.exports = router;