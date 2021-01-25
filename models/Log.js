const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
  log_category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required:true,
  },
  time: {
    type: Date,
    required:false,
  },
  note: {
    type: String,
    required: false
  },
 
});

const Log = mongoose.model("log", LogSchema);

module.exports = Log;

// module.exports = User = mongoose.model("users", UserSchema);
