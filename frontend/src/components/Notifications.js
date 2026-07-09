import { useEffect, useState } from "react";
import socket from "../socket";
import { Link } from "react-router-dom";

function Notifications() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = () => {
    fetch("http://localhost:5001/alerts")
      .then((response) => response.json())
      .then((data) => {
        // Show latest notifications first
        setAlerts(data.reverse());
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAlerts();

    socket.on("alertAdded", fetchAlerts);

    return () => {
      socket.off("alertAdded", fetchAlerts);
    };
  }, []);

  return (
    <div className="card shadow" style={{ height: "100%" }}>
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h5 className="mb-0">🔔 Recent Notifications</h5>

        <Link
          to="/notifications"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          View All
        </Link>
      </div>

      <div
        className="card-body"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {alerts.length === 0 ? (
          <div className="alert alert-info">
            No notifications available.
          </div>
        ) : (
          alerts.slice(0, 5).map((alert) => (
            <div
              key={alert._id}
              className="border rounded p-3 mb-3"
              style={{
                background: "#f8f9fa",
              }}
            >
              <h6 style={{ color: "#0d6efd" }}>
                📢 {alert.title}
              </h6>

              <p
                style={{
                  marginBottom: "6px",
                  fontSize: "15px",
                }}
              >
                {alert.message}
              </p>

              <small className="text-muted">
                {new Date(alert.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      <div className="card-footer text-center">
        <Link
          to="/notifications"
          className="btn btn-outline-primary"
        >
          View All Notifications →
        </Link>
      </div>
    </div>
  );
}

export default Notifications;