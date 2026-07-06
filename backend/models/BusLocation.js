const mongoose = require("mongoose");

const busLocationSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    busNumber: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    speed: {
      type: Number,
      default: 0,
    },

    tripStatus: {
      type: String,
      enum: ["Started", "Stopped"],
      default: "Started",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BusLocation", busLocationSchema);
