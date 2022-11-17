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
      type: Object,
      required:false,
      street: {
        type: String
      },
      city: {
        type: String
      },
      zipcode:{
        type: String
      },
    },
    phone: {
      type: String,
      required : false,
    },
    website: {
      type: String,
      required : false,
    },
    company: {
      type: Array,
      required: false,
      name: {
        type: String
      },
      catchPhrase:{
        type: String
      },
      bs:{
        type: String
      },
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);