const mongoose = require("mongoose");
// create user schema 
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String
      },
      city: {
        type: String
      },
      zipcode:{
        type: String
      },
      type: Array,
      required:false,
    },
    phone: {
      type: Array,
      required : false,
    },
    website: {
      type: Array,
      required : false,
    },
    company: {
      name: {
        type: String
      },
      catchPhrase:{
        type: String
      },
      bs:{
        type: String
      },
      type: Array,
      required:false,
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);