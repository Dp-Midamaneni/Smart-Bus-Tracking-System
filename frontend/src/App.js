import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

import DashboardPage from "./pages/DashboardPage";
import BusPage from "./pages/BusPage";
import MapPage from "./pages/MapPage";
import NotificationPage from "./pages/NotificationPage";
import FeedbackPage from "./pages/FeedbackPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div
          style={{
            marginLeft: "250px",
            width: "100%",
            background: "#F3F4F6",
            minHeight: "100vh"
          }}
        >

          <TopNavbar />

          <div style={{ padding: "20px" }}>

            <Routes>

              <Route path="/" element={<DashboardPage />} />

              <Route path="/buses" element={<BusPage />} />

              <Route path="/map" element={<MapPage />} />

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