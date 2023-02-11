const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname:String,
    mname:String,
    lname:String,
    email:String,
    phone:Number,
    password:String
})

const user = mongoose.model('user',userSchema)
module.exports = user;