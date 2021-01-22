const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  password: {type: String, required: true},
  date: { type: Date, default: Date.now }
});

const userDB = mongoose.model("users", userSchema);

module.exports = userDB;
