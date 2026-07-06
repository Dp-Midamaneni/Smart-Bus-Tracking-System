const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  updateLocation,
  stopTrip,
  getLatestLocation,
} = require("../controllers/locationController");

router.post("/update", protect, updateLocation);
router.put("/stop", protect, stopTrip);
router.get("/:busNumber", getLatestLocation);

module.exports = router;
