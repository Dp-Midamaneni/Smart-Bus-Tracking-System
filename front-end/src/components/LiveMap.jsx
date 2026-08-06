import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";
import { useEffect } from "react";

const busIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
});

function ChangeMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 17);
  }, [position, map]);

  return null;
}

function LiveMap({ position }) {
  return (
    <div className="map-card">
      <h2>🗺 Live Bus Tracking</h2>

      <MapContainer
        center={position}
        zoom={17}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <ChangeMap position={position} />

        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={busIcon}>
          <Popup>Current Bus Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LiveMap;
