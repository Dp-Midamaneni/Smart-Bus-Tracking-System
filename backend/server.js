const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Bus = require("./models/Bus");
const Feedback = require("./models/Feedback");
const Alert = require("./models/Alert");

const feedbackRoutes = require("./routes/feedbackRoutes");
const alertRoutes = require("./routes/alertRoutes");
const busRoutes = require("./routes/busRoutes");

const socket = require("./socket");
const busPath = require("./routes/busPath");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

socket.init(io);

app.use(cors());
app.use(express.json());

app.use("/feedback", feedbackRoutes);
app.use("/alerts", alertRoutes);
app.use("/buses", busRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/busproject")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/check", (req, res) => {
  res.send("CHECK ROUTE WORKING");
});

// ===============================
// Socket Connection
// ===============================

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected:", socket.id);
  });
});

// ===============================
// Automatic Bus Movement
// ===============================

let currentIndex = 0;

setInterval(async () => {
  try {
    const buses = await Bus.find();

    if (buses.length === 0) return;

    currentIndex = (currentIndex + 1) % busPath.length;

    for (const bus of buses) {

     // ===============================
// Automatic Bus Movement
// ===============================

let currentIndex = 0;

setInterval(async () => {
  try {
    const buses = await Bus.find();

    if (buses.length === 0) return;

    currentIndex = (currentIndex + 1) % busPath.length;

    for (let i = 0; i < buses.length; i++) {

      const bus = buses[i];

      // Give each bus a different position on the route
      const position = busPath[(currentIndex + i) % busPath.length];

      bus.currentLocation.latitude = position.latitude;
      bus.currentLocation.longitude = position.longitude;

      // Random speed
      bus.speed = Math.floor(Math.random() * 41) + 20;

      // Automatic Status
      if (bus.speed >= 40) {
        bus.status = "Running";
      } else if (bus.speed >= 20) {
        bus.status = "Delayed";
      } else {
        bus.status = "Stopped";
      }

      bus.updatedAt = new Date();

      await bus.save();

      // Create alert
    }

    io.emit("busUpdated");
  

  } catch (err) {
    console.log(err);
  }

}, 3000);

// ===============================
      

      // Random speed (20–60 km/h)
      bus.speed = Math.floor(Math.random() * 41) + 20;

      // Automatic Status
      if (bus.speed === 0) {
        bus.status = "Stopped";
      } else if (bus.speed < 20) {
        bus.status = "Delayed";
      } else {
        bus.status = "Running";
      }

      bus.updatedAt = new Date();

      await bus.save();

      // ===========================
      // Create Arrival Notification
      // ===========================

      const alert = new Alert({
        title: "Bus Arrival",
        message: `Bus ${bus.busNumber} reached ${busPath[currentIndex].name}`
      });

      await alert.save();
    }

    // Notify frontend
    io.emit("busUpdated");
    io.emit("alertAdded");

  } catch (err) {
    console.log(err);
  }

}, 3000);

// ===============================

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});