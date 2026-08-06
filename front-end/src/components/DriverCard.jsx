import { FaUserAlt, FaPhone, FaEnvelope, FaIdCard } from "react-icons/fa";

function DriverCard() {
  const driver = JSON.parse(localStorage.getItem("driver"));

  return (
    <div className="card">
      <div className="card-title">
        <FaUserAlt />
        <h2>Driver Details</h2>
      </div>

      <div className="info-table">
        <div className="info-row">
          <span>Name</span>
          <span>{driver?.name || "--"}</span>
        </div>

        <div className="info-row">
          <span>Email</span>
          <span>{driver?.email || "--"}</span>
        </div>

        <div className="info-row">
          <span>Phone</span>
          <span>{driver?.phone || "--"}</span>
        </div>

        <div className="info-row">
          <span>License</span>
          <span>{driver?.licenseNumber || "--"}</span>
        </div>
      </div>
    </div>
  );
}

export default DriverCard;
