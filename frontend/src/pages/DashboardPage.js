import Dashboard from "../components/Dashboard";
import BusMap from "../components/BusMap";
import Notifications from "../components/Notifications";

function DashboardPage() {
  return (
    <div style={{ padding: "20px" }}>
      <Dashboard />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <BusMap />

        <Notifications />
      </div>
    </div>
  );
}

export default DashboardPage;