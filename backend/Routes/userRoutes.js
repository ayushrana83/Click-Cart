const express = require("express");
const { createUser, getUserById, updateUser } = require("../Controller.js/userController");
const router = express.Router();

router.get("/own" , getUserById),
router.patch("/" , updateUser),

module.exports = router;