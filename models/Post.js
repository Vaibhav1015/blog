/* 
1. We are importing mongoose from the mongoose module.
2. We are creating a schema for our post.
3. We are exporting the schema as a model.
Now,create a routes for our post.
 */

const mongoose = require("mongoose");

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