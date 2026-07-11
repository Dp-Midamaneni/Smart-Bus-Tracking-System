import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

import DashboardPage from "./pages/DashboardPage";
import NotificationPage from "./pages/NotificationPage";
import FeedbackPage from "./pages/FeedbackPage";

import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            marginLeft: "260px",
            width: "100%",
            background: "#F3F4F6",
            minHeight: "100vh",
          }}
        >
          <TopNavbar />

          {/* Offline Banner */}
          {!isOnline && (
            <div
              style={{
                background: "#DC2626",
                color: "white",
                textAlign: "center",
                padding: "12px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              🔴 Offline Mode - Showing Last Available Data
            </div>
          )}

          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />

              <Route
                path="/notifications"
                element={<NotificationPage />}
              />

              <Route
                path="/feedback"
                element={<FeedbackPage />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;