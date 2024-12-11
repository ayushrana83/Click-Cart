const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    quantity : {
        type : Number , 
        require : true ,
        default : 1,
    },
    product : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Product" ,
        required : true ,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true ,
    }
}, {timestamps : true});

exports.Cart = mongoose.model("Cart" , CartSchema);