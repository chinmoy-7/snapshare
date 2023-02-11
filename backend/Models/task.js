const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userId:String,
    description:String
})

const task = mongoose.model("task",taskSchema);

module.exports = task;