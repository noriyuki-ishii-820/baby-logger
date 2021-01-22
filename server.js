require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api/user");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms");

// Add routes, both API and view
app.use(routes);

// Passport middleware
app.use(passport.initialize());

// Routes
var users = require("./routes/api/user")
app.use("./routes/api/user", users);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT: http://localhost:${PORT}!`);
});