import {
  FaBus,
  FaBell,
  FaUserCircle,
  FaCircle,
  FaCalendarAlt,
} from "react-icons/fa";

function TopNavbar() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        height: "80px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <FaBus
          size={32}
          color="#2563EB"
        />

        <h2
          style={{
            margin: 0,
            color: "#0F172A",
            fontWeight: "700",
          }}
        >
          Smart Bus Tracking System
        </h2>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaCalendarAlt color="#475569" />

          <span>{today}</span>

          <span>|</span>

          <span>{time}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaCircle
            color="#22C55E"
            size={12}
          />

          <strong>Online</strong>
        </div>

        <FaBell
          size={22}
          color="#2563EB"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaUserCircle
            size={36}
            color="#2563EB"
          />

          <strong>Admin</strong>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;