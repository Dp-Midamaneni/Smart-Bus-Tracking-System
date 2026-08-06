import { FaBusAlt } from "react-icons/fa";

function BusCard() {
  const driver = JSON.parse(localStorage.getItem("driver"));

  return (
    <div className="card">
      <div className="card-title">
        <FaBusAlt />

        <h2>Bus Details</h2>
      </div>

      <div className="info-table">
        <div className="info-row">
          <span>Bus Number</span>
          <span>{driver?.busNumber || "--"}</span>
        </div>

        <div className="info-row">
          <span>Route</span>
          <span>Route 101</span>
        </div>

        <div className="info-row">
          <span>Capacity</span>
          <span>45 Seats</span>
        </div>

        <div className="info-row">
          <span>Destination</span>
          <span>City Terminal</span>
        </div>
      </div>
    </div>
  );
}

export default BusCard;
