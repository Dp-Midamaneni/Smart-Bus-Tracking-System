import {
  FaWifi,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaClock,
} from "react-icons/fa";

function LiveStatus({ gpsData }) {
  return (
    <div className="live-status">
      <div className="card-title">
        <FaWifi />
        <h2>Live Status</h2>
      </div>

      <div className="status-item">
        <span>GPS</span>
        <span>{gpsData.status}</span>
      </div>

      <div className="status-item">
        <span>Speed</span>
        <span>{gpsData.speed} km/h</span>
      </div>

      <div className="status-item">
        <span>Latitude</span>
        <span>{gpsData.latitude}</span>
      </div>

      <div className="status-item">
        <span>Longitude</span>
        <span>{gpsData.longitude}</span>
      </div>

      <div className="status-item">
        <span>Updated</span>
        <span>{gpsData.lastUpdated}</span>
      </div>
    </div>
  );
}

export default LiveStatus;
