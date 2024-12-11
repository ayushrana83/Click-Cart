const express = require("express");
const { getOrderByUserId, deleteOrder, addOrder, getAllOrders, updateOrder } = require("../Controller.js/orderController");
const router = express.Router();

router.get("/own" , getOrderByUserId);
router.delete("/:id" , deleteOrder);
router.post("/" , addOrder);
router.patch("/:id" , updateOrder);
router.get("/" , getAllOrders);

module.exports = router;