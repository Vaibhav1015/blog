/* 
1. We are creating a schema for the Albums collection.
2. We are defining the fields that will be present in the Albums collection.
3. We are defining the relationship between the Albums collection and the Users collection.
4. We are exporting the Albums schema.
 */

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