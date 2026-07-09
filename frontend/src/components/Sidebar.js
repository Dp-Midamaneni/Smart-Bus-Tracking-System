import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1F2937",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        boxShadow: "2px 0px 10px rgba(0,0,0,0.2)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        🚌 Smart Bus
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        <Link to="/" style={linkStyle}>
          🏠 Dashboard
        </Link>

        <Link to="/buses" style={linkStyle}>
          🚌 Buses
        </Link>

        <Link to="/map" style={linkStyle}>
          🗺 Live Map
        </Link>

        <Link to="/notifications" style={linkStyle}>
          🔔 Notifications
        </Link>

        <Link to="/feedback" style={linkStyle}>
          💬 Feedback
        </Link>

      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  padding: "12px",
  borderRadius: "8px",
  background: "#374151"
};

export default Sidebar;