const express = require("express");
const { getAllProducts, addProduct, getProductById, updateProduct, searchProduct} = require("../Controller.js/productController");
const router = express.Router();


router.post("/" , addProduct);
router.get("/" , getAllProducts);
router.get("/search/:prefix" , searchProduct);
// router.patch("/update" , updateProduct);
router.get("/:id" , getProductById);
router.patch("/:id" , updateProduct);



module.exports = router;