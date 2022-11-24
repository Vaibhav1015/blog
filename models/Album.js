const mongoose = require("mongoose");


const AlbumSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.Number,
            ref:"User"
        },
        albumId:{
            type:Number
        },
        title:{
            type:String,
            required:true
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Album", AlbumSchema);