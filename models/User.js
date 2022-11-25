/* 
1. We are creating a new schema for our User model.
2. We are defining the fields that we want our User model to have.
3. We are exporting the User model. 
*/

const mongoose = require("mongoose");

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
    id:{
      type:Number
    },
    address: {
      type: Object,
      street: {
        type : Object
      },
      city: {
        type: Object
      },
      zipcode:{
        type: Object
      },
    },
    phone: {
      type: Object,
      required : false,
    },
    website: {
      type: Object,
      required : false,
    },
    company: {
      type: Object,
      required: false,
      name: {
        type: Object
      },
      catchPhrase:{
        type: Object
      },
      bs:{
        type: Object
      },
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);