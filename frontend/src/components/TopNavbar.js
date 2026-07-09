function TopNavbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ color: "#2563EB" }}>
        🚌 Smart Bus Tracking System
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <span style={{ fontSize: "22px" }}>🔔</span>

        <span style={{ fontWeight: "bold" }}>
          👤 Admin
        </span>
      </div>
    </div>
  );
}

export default TopNavbar;