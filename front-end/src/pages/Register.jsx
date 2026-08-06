import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBus,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaLock,
} from "react-icons/fa";

import api from "../services/api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    busNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      alert("Driver Registered Successfully!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-circle">
          <FaBus />
        </div>

        <h1>Driver Registration</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Driver Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaPhone />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaIdCard />
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaBus />
            <input
              type="text"
              name="busNumber"
              placeholder="Bus Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="bottom-text">
          Already have an account?
          <Link to="/"> Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
