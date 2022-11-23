const mongoose = require("mongoose");
//create comment schema
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