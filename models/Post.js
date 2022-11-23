const mongoose = require("mongoose");
//create post schema
const PostSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.Number,
      ref:"User"
    },
    postId:{
      type:Number
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);