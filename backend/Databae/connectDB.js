const mongoose = require("mongoose")
mongoose.set('strictQuery',false)
const connectDB= ()=>{
    return mongoose.connect("mongodb+srv://root:root@cluster0.v4h80xh.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("Connected to DB");
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports = connectDB;