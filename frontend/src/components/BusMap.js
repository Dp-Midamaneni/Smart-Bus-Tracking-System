import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import socket from "../socket";
const busIcon = new L.Icon({
  iconUrl: "/bus.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

function BusMap() {
  const [buses, setBuses] = useState([]);

  const fetchBuses = () => {
    fetch("http://localhost:5001/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBuses();

    socket.on("busUpdated", fetchBuses);

    return () => {
      socket.off("busUpdated", fetchBuses);
    };
  }, []);

  const routeCoordinates = [
    [17.3850, 78.4867],
    [17.3870, 78.4880],
    [17.3890, 78.4900],
    [17.3910, 78.4920],
    [17.3950, 78.4967]
  ];

  const busStops = [
    {
      name: "College",
      position: [17.3850, 78.4867]
    },
    {
      name: "Bus Stop 1",
      position: [17.3870, 78.4880]
    },
    {
      name: "Bus Stop 2",
      position: [17.3890, 78.4900]
    },
    {
      name: "Bus Stop 3",
      position: [17.3910, 78.4920]
    },
    {
      name: "City",
      position: [17.3950, 78.4967]
    }
  ];

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-success text-white">
          <h3>🗺 Live Bus Tracking</h3>
        </div>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col">
              <span className="badge bg-success me-2">
                🟢 Running
              </span>

              <span className="badge bg-danger me-2">
                🔴 Stopped
              </span>

              <span className="badge bg-warning text-dark me-2">
                🟠 Delayed
              </span>

              <span className="badge bg-primary">
                🔵 Route
              </span>
            </div>

          </div>

          <MapContainer
            center={[17.3890, 78.4900]}
            zoom={14}
            style={{
              height: "550px",
              width: "100%",
              borderRadius: "10px"
            }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: "blue",
                weight: 5
              }}
            />

            {busStops.map((stop, index) => (
              <Marker
                key={index}
                position={stop.position}
              >
                <Popup>
  <div style={{ minWidth: "180px" }}>
    </div>
    
</Popup>
              </Marker>
            ))}

            {buses.map((bus) => (
              <Marker
  key={bus._id}
  position={[
    bus.currentLocation.latitude,
    bus.currentLocation.longitude,
  ]}
  icon={busIcon}
>
  <Popup>
    <h5>🚌 Bus {bus.busNumber}</h5>

    <p>
      <strong>Driver:</strong> {bus.driverName}
    </p>

    <p>
      <strong>Route:</strong> {bus.route}
    </p>

    <p>
      <strong>Speed:</strong> {bus.speed} km/h
    </p>

    <p>
      <strong>Status:</strong> {bus.status}
    </p>

    <p>
      <strong>Last Updated:</strong>
      <br />
      {new Date(bus.updatedAt).toLocaleString()}
    </p>
  </Popup>
</Marker>
            ))}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default BusMap;