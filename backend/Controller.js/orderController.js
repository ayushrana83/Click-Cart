const { sendOrderInvoiceMail } = require("../Common/Common");
const { Order } = require("../models/Order");
const { User } = require("../models/User");


exports.getOrderByUserId = async(req , res) =>{
    try {
        const {id} = req.user;
        const orders = await Order.find({user : id});
        // console.log("orders =" , orders);
        res.status(201).json(orders);
    } catch (error) {
        console.log("error in getOrderByUserId api" , error);
        res.status(401).json({"error in getOrderByUserId api" : error})
    }
}

exports.addOrder = async(req , res) =>{
    try {
        const orders = new Order(req.body);
        const user = await User.findOne(orders.user);
        await orders.save();
        sendOrderInvoiceMail({orders , to : user.email});
        res.status(201).json(orders);
    } catch (error) {
        console.log("error in addOrder api" , error);
        res.status(401).json({"error in addOrder api" : error})
    }
}

exports.deleteOrder = async(req , res) =>{
    try {
        const {id} = req.params;
        const orders = await Order.findByIdAndDelete(id);
        res.status(201).json(orders);
    } catch (error) {
        console.log("error in deleteOrder api" , error);
        res.status(401).json({"error in deleteOrder api" : error})
    }
}

exports.updateOrder = async(req , res) =>{
    try {
        const {id} = req.params;
        const orders = await Order.findByIdAndUpdate(id , req.body , {new : true});
        res.status(201).json(orders);
    } catch (error) {
        console.log("error in updateOrder api" , error);
        res.status(401).json({"error in updateOrder api" : error})
    }
}

exports.getAllOrders = async (req, res) => {
    try {
    //   console.log("getAllOrders API called");
  
      const { _sort, _order, _page, _per_page } = req.query;
  
      // Base query for fetching orders
      let query = Order.find({});
  
      // Apply sorting if provided
      if (_sort && _order) {
        const sortOrder = _order === "desc" ? -1 : 1;
        query = query.sort({ [_sort]: sortOrder });
      }
  
      // Count total documents (without pagination)
      const totalCount = await Order.countDocuments();
  
      // Apply pagination if provided
      if (_page && _per_page) {
        const pageSize = parseInt(_per_page, 10);
        const page = parseInt(_page, 10);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
      }
  
      // Execute the query to get the orders
      const orders = await query.exec();
  
      // Send the response
      res.status(200).json({ data: orders, items: totalCount });
    } catch (error) {
      console.error("Error in getAllOrders API:", error);
      res.status(500).json({ error: "An error occurred while fetching orders", details: error.message });
    }
  };
  