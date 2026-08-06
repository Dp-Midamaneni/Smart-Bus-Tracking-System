const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getDriverProfile } = require("../controllers/driverController");

router.get("/profile", protect, getDriverProfile);

module.exports = router;
