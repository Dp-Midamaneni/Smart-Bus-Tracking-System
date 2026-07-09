import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">

        <span className="navbar-brand fw-bold fs-3">
          🚌 Smart Bus Tracking System
        </span>

        <div className="ms-auto">
          <span className="text-white me-4">
            Dashboard
          </span>

          <span className="text-white me-4">
            Buses
          </span>

          <span className="text-white me-4">
            Map
          </span>

          <span className="text-white me-4">
            Notifications
          </span>

          <span className="text-white">
            Feedback
          </span>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;