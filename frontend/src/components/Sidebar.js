import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBell,
  FaCommentDots,
  FaBus,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "linear-gradient(180deg,#0F172A,#1E293B)",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 0 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Logo */}
      <div>
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "85px",
              height: "85px",
              margin: "auto",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "38px",
              color: "white",
              boxShadow:
                "0 12px 25px rgba(37,99,235,.45)",
            }}
          >
            <FaBus />
          </div>

          <h2
            style={{
              marginTop: "18px",
              marginBottom: "5px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            SMART BUS
          </h2>

          <p
            style={{
              color: "#60A5FA",
              fontSize: "13px",
              letterSpacing: "2px",
              fontWeight: "600",
            }}
          >
            TRACKING SYSTEM
          </p>
        </div>

        {/* Menu */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <MenuItem
            to="/"
            icon={<FaHome />}
            text="Dashboard"
          />

          <MenuItem
            to="/notifications"
            icon={<FaBell />}
            text="Notifications"
          />

          <MenuItem
            to="/feedback"
            icon={<FaCommentDots />}
            text="Feedback"
          />
        </nav>
      </div>

      {/* Bottom Card */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#1E3A8A,#1D4ED8)",
          borderRadius: "18px",
          padding: "18px",
          color: "white",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <FaCheckCircle
            color="#22C55E"
            size={20}
          />

          <strong>System Status</strong>
        </div>

        <p
          style={{
            color: "#4ADE80",
            fontWeight: "bold",
            marginBottom: "18px",
          }}
        >
          ● Online
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#DBEAFE",
            marginBottom: "8px",
          }}
        >
          <FaClock />

          <span>Last Sync</span>
        </div>

        <small
          style={{
            color: "#E0E7FF",
            lineHeight: "22px",
          }}
        >
          11 July 2026
          <br />
          03:45 PM
        </small>
      </div>
    </div>
  );
}

function MenuItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "15px 18px",
        borderRadius: "14px",
        textDecoration: "none",
        color: "white",
        fontSize: "17px",
        fontWeight: "600",
        background: isActive
          ? "linear-gradient(90deg,#2563EB,#3B82F6)"
          : "transparent",
        boxShadow: isActive
          ? "0 10px 20px rgba(37,99,235,.35)"
          : "none",
        transition: "all .3s ease",
      })}
    >
      <span style={{ fontSize: "20px" }}>
        {icon}
      </span>

      {text}
    </NavLink>
  );
}

export default Sidebar;