import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBus, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import api from "../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("driver", JSON.stringify(res.data.driver));

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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

        <h1>Smart Bus Tracking</h1>

        <p>Driver Login</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">{loading ? "Logging In..." : "Login"}</button>
        </form>

        <div className="bottom-text">
          New Driver?
          <Link to="/register"> Register Here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
