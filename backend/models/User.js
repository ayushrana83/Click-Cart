const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email : {
        type : String ,
        required : true,
        unique : true,
    },
    password : {
        type : Buffer , 
        required : true,
    },
    role : {
        type : String , 
        required : true,
        default : "user",
    },
    addresses : {
        type : [mongoose.Schema.Types.Mixed] , 
    },
    salt : {
        type : Buffer,
    },
    resetPasswordToken : {
        type : String ,
        default : ""
    }
}, {timestamps : true});

exports.User = mongoose.model("User" , UserSchema);