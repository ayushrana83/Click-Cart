const {Brand} = require("../models/Brand.js")

exports.getAllBrands = async(req , res) => {
    try {
        const brands = await Brand.find({});
        res.status(201).json(brands);
    } catch (error) {
        console.log("error int getAllBrands api" , error);
        res.status(401).json({"error int getAllBrands api" : error})
    }
}

exports.addBrand = async(req , res) => {
    try {
        const brand = new Brand(req.body);
        await brand.save();
        res.status(201).json(brand);
    } catch (error) {
        console.log("error in creating brand " , error);
        res.status(401).json({"error in creating brand " : error});
    }
}
