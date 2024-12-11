const express = require("express");
const {
  getUserCart,
  addToCart,
  updateCart,
  deleteItemInCart,
  clearCart,
} = require("../Controller.js/CartController");
const router = express.Router();

router.get("/" , getUserCart);
router.post("/" , addToCart);
router.patch("/:id", updateCart);
router.delete("/single/:id", deleteItemInCart);
router.delete("/clear", clearCart);

module.exports = router;
