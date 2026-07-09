const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

// ==========================
// GET ALL ALERTS
// ==========================
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ==========================
// ADD NEW ALERT
// ==========================
router.post("/", async (req, res) => {
  try {
    const alert = new Alert(req.body);
    const savedAlert = await alert.save();

    res.status(201).json(savedAlert);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// ==========================
// DELETE ONE ALERT
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);

    res.json({
      message: "Alert deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ==========================
// DELETE ALL ALERTS
// ==========================
router.delete("/", async (req, res) => {
  try {
    await Alert.deleteMany({});

    res.json({
      message: "All alerts deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;