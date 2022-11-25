/* 
1. We are importing mongoose from mongoose.
2. We are creating a schema for our Photo model.
3. We are exporting the Photo model.
Now,create a routes for our Photo model.
 */

const mongoose = require("mongoose");
const PhotoSchema = new mongoose.Schema(
    {
      albumId:{
        type:mongoose.Schema.Types.Number,
        ref:"Album"
      },
      title:{
        type:String
      },
      photoId:{
        type:Number
      },
      url:{
        type:String
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Photo", PhotoSchema);