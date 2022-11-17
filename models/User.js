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
        type: Object
      },
      city: {
        type: Object
      },
      zipcode:{
        type: Object
      },
      type: Object,
      required:false,
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
      name: {
        type: Object
      },
      catchPhrase:{
        type: Object
      },
      bs:{
        type: Object
      },
      type: Object,
      required:false,
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);