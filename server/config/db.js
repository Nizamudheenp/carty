const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async ()=>{
    try {
       const db =  mongoose.connect(process.env.MONGO_URI)
       if(db){
        console.log("DB conection successful");   
     }
    } catch (error) {
        console.log("DB connection failed");
        
    }
}
module.exports  = connectDB