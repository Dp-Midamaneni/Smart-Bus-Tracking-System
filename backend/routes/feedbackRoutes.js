const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;