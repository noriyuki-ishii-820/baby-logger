const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BabySchema = new Schema({
  baby_first_name: {
    type: String,
    required: true
  },
  baby_last_name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  tagNumber: {
    type: String,
    required: false,
  },
  parentUserId: {
    type: String,
    required: false
  }
});

const Baby = mongoose.model("baby", BabySchema);

module.exports = Baby;
