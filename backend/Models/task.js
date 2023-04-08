const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userId:String,
    description:String,
    status:Boolean
})

const task = mongoose.model("task",taskSchema);

module.exports = task;