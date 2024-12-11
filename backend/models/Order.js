const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    items :{
        type : [mongoose.Schema.Types.Mixed],
        required : true,
    },
    totalAmount : {
        type : Number 
    },
    totalItems : {
        type : Number
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true ,
    },
    status : {
        type : String,
        default : "pending"
    },
    selectedAddress : {
        type : mongoose.Schema.Types.Mixed,
        required : true ,
    },
    paymentMethod : {
        type : String,
        require : true,
    }
}, {timestamps : true});

exports.Order = mongoose.model("Order" , OrderSchema);