const BusLocation = require("../models/BusLocation");
const { getIO } = require("../socket");

// Update Bus Location
const updateLocation = async (req, res) => {
  try {
    const { busNumber, latitude, longitude, speed } = req.body;

    const location = await BusLocation.create({
      driver: req.driver._id,
      busNumber,
      latitude,
      longitude,
      speed,
      heading,
      tripStatus: "Started",
    });

    // Broadcast live location
    getIO().emit("busLocationUpdated", location);

    res.status(201).json({
      message: "Location Updated Successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Stop Trip
const stopTrip = async (req, res) => {
  try {
    const { busNumber } = req.body;

    const trip = await BusLocation.findOneAndUpdate(
      {
        driver: req.driver._id,
        busNumber,
      },
      {
        tripStatus: "Stopped",
      },
      {
        new: true,
      },
    );

    res.json({
      message: "Trip Stopped Successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Latest Bus Location
const getLatestLocation = async (req, res) => {
  try {
    const location = await BusLocation.findOne({
      busNumber: req.params.busNumber,
    }).sort({
      createdAt: -1,
    });

    res.json(location);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateLocation,
  stopTrip,
  getLatestLocation,
};
