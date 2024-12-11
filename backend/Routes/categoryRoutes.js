const express = require("express");
const { getAllCategory, addCategory } = require("../Controller.js/categoryController");
const router = express.Router();

router.get("/" , getAllCategory);
router.post("/" , addCategory);


module.exports = router;