/* 
1. We are importing mongoose from mongoose.
2. We are creating a schema for our Comment model.
3. We are exporting the Comment model.
Now,create a routes for our Comment model.
 */

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        postId:{
            type:Number,
            ref:"Post"
        },
        commentId:{
            type:Number
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);