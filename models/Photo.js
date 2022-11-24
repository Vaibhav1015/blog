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