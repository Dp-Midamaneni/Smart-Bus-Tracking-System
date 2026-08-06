const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  busNumber: String,
  rating: Number,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);