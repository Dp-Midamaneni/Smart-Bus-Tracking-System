import { useState } from "react";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "admin" && password === "admin123") {
      alert("Login Successful");
      onLogin(true);
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "30px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
      }}
    >
      <h2>🔐 Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px"
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "12px",
          background: "#1565C0",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        Login
      </button>
    </div>
  );
}

export default AdminLogin;