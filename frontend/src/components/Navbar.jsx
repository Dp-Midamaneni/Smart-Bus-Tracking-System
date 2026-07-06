import { FaBus, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const driver = JSON.parse(localStorage.getItem("driver"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("driver");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaBus />
        <span>Smart Bus Tracking</span>
      </div>

      <div className="nav-right">
        <div className="driver-profile">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>{driver?.name || "Driver"}</h4>
            <small>Bus Driver</small>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
