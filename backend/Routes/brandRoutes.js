const express = require("express");
const { getAllBrands, addBrand } = require("../Controller.js/brandController");
const router = express.Router();

router.get("/" , getAllBrands);
router.post("/" , addBrand);




module.exports = router;