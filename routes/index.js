const path = require("path");
const router = require("express").Router();
const apiUserRoutes = require("./api/user-routes");
const apiBabyRoutes = require("./api/baby-routes");
const apiLogRoutes = require("./api/log-routes");
const apiCategoryRoutes = require("./api/category-routes");
const apiResetPasswordRoutes = require("./api/resetPassword-route")
// API Routes
router.use(apiUserRoutes);
router.use(apiBabyRoutes);
router.use(apiLogRoutes);
router.use(apiCategoryRoutes);
router.use(apiResetPasswordRoutes)

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
