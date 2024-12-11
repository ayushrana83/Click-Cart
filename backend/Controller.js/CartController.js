const { Cart } = require("../models/Cart");

exports.getUserCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.find({ user: id }).populate("product");
    res.status(201).json(cart);
  } catch (error) {
    console.log("error in getUserCart api", error);
    res.status(401).json({ "error in getUserCart api": error });
  }
};

exports.addToCart = async (req, res) => {
  // console.log(req);
  try {
    // console.log("att ot card");
    const { id } = req.user;
    const cart = new Cart({ ...req.body, user: id });
    await cart.save();
    const newCart = await cart.populate("product");
    // console.log(newCart);
    res.status(201).json(newCart);
  } catch (error) {
    console.log("error in addToCart api", error);
    res.status(401).json({ "error in addToCart api": error });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    const newCart = await cart.populate("product");
    res.status(201).json(newCart);
  } catch (error) {
    console.log("error in updateCart api", error);
    res.status(401).json({ "error in updateCart api": error });
  }
};

exports.clearCart = async (req, res) => {
  try {
    console.log("resetCart api")
    const { id } = req.user;
    // console.log(req.user);
    const cart = await Cart.deleteMany({ user: id });
    res.status(201).json(cart);
  } catch (error) {
    console.log("error in deleteCart api", error);
    res.status(401).json({ "error in deleteCart api": error });
  }
};

exports.deleteItemInCart = async (req, res) => {
  try {
    console.log("deleteItem api")
    const { id } = req.user;
    // console.log(req.user);
    const cart = await Cart.findOneAndDelete({ user : id });
    res.status(201).json(cart);
  } catch (error) {
    console.log("error in deleteItemInCart api", error);
    res.status(401).json({ "error in deleteItemInCart api": error });
  }
};
