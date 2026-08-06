import { useEffect, useState, useRef } from "react";
import socket from "../socket";
import { Link } from "react-router-dom";

function Notifications() {
  const [alerts, setAlerts] = useState([]);
  const [lastSync, setLastSync] = useState("");
  const notificationSent = useRef(false);

  const fetchAlerts = () => {
    fetch("http://localhost:5001/alerts")
      .then((response) => response.json())
      .then((data) => {
        const latestAlerts = [...data].reverse();

        setAlerts(latestAlerts);

        const time = new Date().toLocaleString();
        setLastSync(time);

        localStorage.setItem(
          "alerts",
          JSON.stringify(latestAlerts)
        );

        localStorage.setItem("lastSync", time);
      })
      .catch(() => {
        const savedAlerts = localStorage.getItem("alerts");
        const savedTime = localStorage.getItem("lastSync");

        if (savedAlerts) {
          setAlerts(JSON.parse(savedAlerts));
        }

        if (savedTime) {
          setLastSync(savedTime);
        }
      });
  };

  useEffect(() => {
    fetchAlerts();

    // Ask browser notification permission
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    // Demo 5-minute notification
    const timer = setTimeout(() => {
      if (
        Notification.permission === "granted" &&
        !notificationSent.current
      ) {
        new Notification("🚌 Smart Bus Alert", {
          body: "Your bus will arrive in 5 minutes. Please reach the bus stop.",
          icon: "/bus.png",
        });

        notificationSent.current = true;
      }
    }, 10000);

    socket.on("alertAdded", fetchAlerts);

    return () => {
      socket.off("alertAdded", fetchAlerts);
      clearTimeout(timer);
    };
  }, []);

  return (
   <div
  className="card border-0 shadow h-100"
  style={{
    borderRadius: "22px",
    minHeight: "650px",
  }}
>
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
          maxHeight: "430px",
          overflowY: "auto",
        }}
      >
        <p
          className="text-muted"
          style={{ fontSize: "14px" }}
        >
          <strong>Last Sync:</strong>{" "}
          {lastSync || "No data available"}
        </p>

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