
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.Number,
    ref:"User"
  },
  todoId:{
    type:Number
  },
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
  
});

module.exports = new mongoose.model("Todo", TodoSchema);