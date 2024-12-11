const { Category } = require("../models/Category");


exports.getAllCategory = async(req , res) => {
    try {
        const category = await Category.find({});
        res.status(201).json(category);
    } catch (error) {
        console.log("error in getAllCategory api" , error);
        res.status(401).json({"error in getAllCategory api" : error})
    }
}

exports.addCategory = async(req , res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.log("error in creating category " , error);
        res.status(401).json("error in creating category " , error);
    }
}
