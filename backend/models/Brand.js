const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema({
    label : {
        type : String,
        required : true,
        unique : true,
    },
    value : {
        type : String,
        required : true,
        unique : true,
    }
} , {timestamps : true});

exports.Brand = mongoose.model("Brand" , BrandSchema);