import { FaPlay, FaStop } from "react-icons/fa";

function TripControls({ onStartTrip, onStopTrip }) {
  return (
    <div className="card">
      <div className="card-title">
        <h2>Trip Controls</h2>
      </div>

      <div className="trip-buttons">
        <button className="start-btn" onClick={onStartTrip}>
          <FaPlay />
          <span style={{ marginLeft: "8px" }}>Start Trip</span>
        </button>

        <button className="stop-btn" onClick={onStopTrip}>
          <FaStop />
          <span style={{ marginLeft: "8px" }}>Stop Trip</span>
        </button>
      </div>
    </div>
  );
}

export default TripControls;
