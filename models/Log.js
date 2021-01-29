const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
  date: {
    type: String,
    required:true,
  },
  time: {
    type: String,
    required:false,
  },
  logCategory: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: false
  },
  babyId: {
    type: String,
    required: false
  },
  parentUserId: {
    type: String,
    required: false
  },
});

const Log = mongoose.model("log", LogSchema);

module.exports = Log;

// module.exports = User = mongoose.model("users", UserSchema);
