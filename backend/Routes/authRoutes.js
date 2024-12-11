const express = require("express");
const { loginUser, signUpUser,  checkAuth, resetPasswordRequest, resetPassword, logout } = require("../Controller.js/authController");
const passport = require("passport");
const router = express.Router();

router.post("/signup" , signUpUser)
router.get("/logout" , logout)
router.post("/login" , passport.authenticate("local") , loginUser)
router.get("/check" , passport.authenticate("jwt") , checkAuth);
router.post("/passwordReset-request" , resetPasswordRequest);
router.post("/reset-Password" , resetPassword);


module.exports = router;

