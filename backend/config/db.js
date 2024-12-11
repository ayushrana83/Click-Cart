const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const connectDB = async () => {
    try {
        // console.log(process.env.CONNECTION_STRING);
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("db connect");
    } catch (error) {
        console.log("Error in db connection " , error);
    }
}

module.exports = connectDB;