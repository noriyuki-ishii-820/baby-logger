const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  category: {
    type: String,
    required: true
  },
  parentUserId: {
    type: String,
    required: true
  },
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
