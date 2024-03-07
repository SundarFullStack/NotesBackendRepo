const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {

        const connected = await mongoose.connect(process.env.MongoDB_URL);
        if (connected) {
            console.log("Database Connected Successfully");
        }
        else {
            console.log("Error in connecting database");
        }
        
    }catch(error){
        console.log("Error",error)
}}

module.exports = connectDB