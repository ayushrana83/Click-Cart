const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
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
}, {timestamps : true});

exports.Category = mongoose.model("Category" , CategorySchema);