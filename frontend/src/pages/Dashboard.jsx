import { useState } from "react";

import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import StatusCards from "../components/StatusCards";
import DriverCard from "../components/DriverCard";
import BusCard from "../components/BusCard";
import TripControls from "../components/TripControls";
import LiveStatus from "../components/LiveStatus";
import RecentActivity from "../components/RecentActivity";
import LiveMap from "../components/LiveMap";

import "../styles/Dashboard.css";

function Dashboard() {
  const [position, setPosition] = useState([17.385, 78.4867]);

  const [gpsData, setGpsData] = useState({
    status: "Waiting",
    speed: 0,
    latitude: 17.385,
    longitude: 78.4867,
    lastUpdated: "--",
  });

  const [watchId, setWatchId] = useState(null);

  const startTrip = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      async (location) => {
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;
        const speed = Math.round((location.coords.speed || 0) * 3.6);

        setPosition([lat, lng]);

        setGpsData({
          status: "Connected",
          speed: speed,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
          lastUpdated: new Date().toLocaleTimeString(),
        });

        try {
          const token = localStorage.getItem("token");
          const driver = JSON.parse(localStorage.getItem("driver"));

          await fetch("http://localhost:5000/api/location/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              busNumber: driver.busNumber,
              latitude: lat,
              longitude: lng,
              speed: speed,
            }),
          });

          console.log("📍 Location sent to backend");
        } catch (error) {
          console.error("Failed to send location:", error);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );

    setWatchId(id);
  };

  const stopTrip = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setGpsData((prev) => ({
      ...prev,
      status: "Stopped",
      speed: 0,
    }));
  };

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <WelcomeBanner />

        <StatusCards gpsData={gpsData} />

        <div className="info-grid">
          <DriverCard />

          <BusCard />

          <TripControls onStartTrip={startTrip} onStopTrip={stopTrip} />
        </div>

        <div className="bottom-grid">
          <div className="map-section">
            <LiveMap position={position} />
          </div>

          <div className="right-section">
            <LiveStatus gpsData={gpsData} />

            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
