const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Alert = require("./models/Alert");
const Feedback = require("./models/Feedback");

const feedbackRoutes = require("./routes/feedbackRoutes");
const alertRoutes = require("./routes/alertRoutes");

const app = express();
const server = http.createServer(app);

// ===============================
// Socket.IO
// ===============================

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/feedback", feedbackRoutes);
app.use("/alerts", alertRoutes);

// ===============================
// MongoDB
// ===============================

mongoose
  .connect("mongodb://127.0.0.1:27017/busproject")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ===============================
// Test Routes
// ===============================

app.get("/", (req, res) => {
  res.send("Person C Backend Running");
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
// Server
// ===============================

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});