const mongoose = require("mongoose");
//create category schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);