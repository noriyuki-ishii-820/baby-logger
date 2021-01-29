const path = require("path");
const router = require("express").Router();
const apiUserRoutes = require("./api/user-routes");
const apiBabyRoutes = require("./api/baby-routes");
const apiLogRoutes = require("./api/log-routes");

// API Routes
router.use(apiUserRoutes);
router.use(apiBabyRoutes);
router.use(apiLogRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
