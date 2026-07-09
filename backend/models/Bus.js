const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  currentLocation: {
    latitude: Number,
    longitude: Number
  },
  speed: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "Running"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Bus", busSchema);