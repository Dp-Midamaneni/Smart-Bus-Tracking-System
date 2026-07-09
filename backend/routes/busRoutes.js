const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const socket = require("../socket");

// =======================
// GET ALL BUSES
// =======================
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// ADD NEW BUS
// =======================
router.post("/", async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();

    // Notify all connected clients
    socket.getIO().emit("busUpdated");

    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// =======================
// UPDATE BUS
// =======================
router.put("/:id", async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Notify all connected clients
    socket.getIO().emit("busUpdated");

    res.json(updatedBus);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// DELETE BUS
// =======================
router.delete("/:id", async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);

    // Notify all connected clients
    socket.getIO().emit("busUpdated");

    res.json({
      message: "Bus deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;