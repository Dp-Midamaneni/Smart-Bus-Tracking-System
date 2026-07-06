const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Register Driver
// ======================
const registerDriver = async (req, res) => {
  console.log("🟢 Register API Hit");
  console.log("Request Body:", req.body);

  try {
    const { name, email, phone, licenseNumber, busNumber, password } = req.body;

    const exists = await Driver.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Driver already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      phone,
      licenseNumber,
      busNumber,
      password: hashedPassword,
    });

    console.log("✅ Driver Registered:", driver.email);

    res.status(201).json({
      message: "Driver registered successfully",
      driver,
    });
  } catch (err) {
    console.log("❌ Register Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ======================
// Login Driver
// ======================
const loginDriver = async (req, res) => {
  console.log("🔥 Login API Hit");
  console.log("Request Body:", req.body);

  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    console.log("Driver Found:", driver);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const match = await bcrypt.compare(password, driver.password);

    console.log("Password Match:", match);

    if (!match) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("✅ Login Successful");

    res.status(200).json({
      message: "Login successful",
      token,
      driver,
    });
  } catch (err) {
    console.log("❌ Login Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerDriver,
  loginDriver,
};
