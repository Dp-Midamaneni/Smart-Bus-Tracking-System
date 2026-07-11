import Dashboard from "../components/Dashboard";
import Notifications from "../components/Notifications";
import FeedbackForm from "../components/FeedbackForm";

function DashboardPage() {
  return (
    <div className="container-fluid py-4">

      {/* Welcome Section */}
      <div className="mb-4">
        <h1
          style={{
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          Welcome back, Admin! 👋
        </h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "18px",
          }}
        >
          Here's what's happening with your system today.
        </p>
      </div>

      {/* Dashboard Cards */}
      <Dashboard />

      {/* Notifications + Feedback */}
      <div className="row mt-4 gx-4">

  <div className="col-lg-6 mb-4">
    <Notifications />
  </div>

  <div className="col-lg-6 mb-4">
    <FeedbackForm />
  </div>

</div>
      {/* Footer */}
      <footer
        style={{
          marginTop: "30px",
          textAlign: "center",
          color: "#64748B",
          padding: "20px",
          fontSize: "14px",
        }}
      >
        © 2026 Smart Bus Tracking System | Person C Module
      </footer>

    </div>
  );
}

export default DashboardPage;