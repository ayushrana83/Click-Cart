const express = require("express");
const Product = require("../models/Product");
const { options } = require("../Routes/productRoutes");

exports.addProduct = async(req , res) => {
    try {
        const product = new Product(req.body);
        product.discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100) , 2)
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log("error in creating product " , error);
        res.status(401).json({"error in creating product " : error});
    }
}

exports.getAllProducts = async(req , res) => {
    try{
        let condition = {};
        if(!req.query.admin)
        {
            condition.deleted = { $ne : true}; 
        }
        // console.log("req.query " , req.query);
        let query = Product.find(condition);
        let totalQuery = Product.find(condition);
        if(req.query.category)
        {
            query = query.find({category : {$in:req.query.category.split(",")}});
            totalQuery = totalQuery.find({category : {$in : req.query.category.split(",")}});
        }
        if(req.query.brand)
        {
            query = query.find({brand : {$in : req.query.brand.split(",")}});
            totalQuery = totalQuery.find({brand : {$in : req.query.brand.split(",")}});
        }
        if(req.query._sort && req.query._order)
        {
            // query = query.sort("title" : "desc");
            query = query.sort({[req.query._sort] : req.query._order});
        }
        if(req.query._page && req.query._per_page)
        {
            let pageSize = req.query._per_page;
            let page = req.query._page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }

        const count = await totalQuery.countDocuments().exec();
        const products = await query.exec();
        // console.log(count);
        // res.set("items" , count);
        res.status(201).json({data : products , items : count});
    }
    catch(error){
        console.log("error in getting all products " , error);
        res.status(401).json({"error in getting product " : error});
    }
}


exports.getProductById = async(req, res) => {
    try {
        // console.log("adsasdasd");
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product)
        {
            res.status(404).json({message : "no product found with id"});
        }
        else
        {
            res.status(201).json(product);
        }
    } catch (error) {
        console.log("error in getting product by id" , error);
        res.status(401).json({"error in getting product by id" : error});
    }
}


exports.updateProduct = async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id , req.body , {new : true});
        if(!product)
        {
            res.status(404).json({message : "no product found with id"});
        }
        else
        {
            product.discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100) , 2)
            await product.save();
            res.status(201).json(product);
        }
    } catch (error) {
        console.log("error in updating product by id" , error);
        res.status(401).json({"error in updating product by id" : error});
    }
}

exports.searchProduct = async(req , res) => {
    try {
        console.log("Search product");
        const prefix = req.params.prefix;
        const products = await Product.find({title : {$regex : `^${prefix}` , $options : "i"}})
        const totalItems = products.length;
        res.status(200).json({products , totalItems});
    } catch (error) {
        console.log("error in search product " , error);
        res.status(401).json({"error in search product " : error});
    }
}
// exports.updateProduct = async(req , res) => {
//     try {
//         console.log("update product");
//         const products = await Product.find({});
//         const highlights = ["This is a dummy highlight added for testing 1" , "This is a dummy highlight added for testing 2" , "This is a dummy highlight added for testing 3" ];
//         await Promise.all(products.map(async (product) => {
//             product.highlights = highlights;
//             await product.save();
//         }));
//         res.status(200).json("success");
//     } catch (error) {
//         console.log("error in update product " , error);
//         res.status(401).json({"error in update product " : error});
//     }
// }


