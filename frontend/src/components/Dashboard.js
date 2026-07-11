import { useEffect, useState } from "react";
import {
  FaBus,
  FaCommentDots,
  FaBell,
  FaWifi,
} from "react-icons/fa";

function Dashboard() {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState("");

  useEffect(() => {
    fetchFeedback();
    fetchNotifications();

    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch("http://localhost:5001/feedback");
      const data = await res.json();

      setFeedbackCount(data.length);
      setLastSync(new Date().toLocaleString());
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5001/alerts");
      const data = await res.json();

      setNotificationCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Total Buses",
      value: "12",
      icon: <FaBus />,
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      title: "Feedback",
      value: feedbackCount,
      icon: <FaCommentDots />,
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      title: "Notifications",
      value: notificationCount,
      icon: <FaBell />,
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
    {
      title: "Status",
      value: isOnline ? "Online" : "Offline",
      icon: <FaWifi />,
      color: isOnline ? "#22C55E" : "#EF4444",
      bg: "#F8FAFC",
    },
  ];

  return (
    <div className="row g-4">

      {cards.map((card, index) => (
        <div
          className="col-xl-3 col-md-6"
          key={index}
        >
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "18px",
            }}
          >
            <div className="card-body">

              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "15px",
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.color,
                  fontSize: "24px",
                  marginBottom: "18px",
                }}
              >
                {card.icon}
              </div>

              <h6
                style={{
                  color: "#64748B",
                }}
              >
                {card.title}
              </h6>

              <h2
                style={{
                  fontWeight: "700",
                  color: "#0F172A",
                }}
              >
                {card.value}
              </h2>

            </div>
          </div>
        </div>
      ))}

      <div className="col-12 mt-3">
        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "18px",
          }}
        >
          <div className="card-body">
            <strong>Last Sync :</strong> {lastSync || "--"}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;