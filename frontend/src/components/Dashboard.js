import { useEffect, useState } from "react";
import socket from "../socket";

function Dashboard() {
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

  const running = buses.filter((bus) => bus.status === "Running").length;
  const stopped = buses.filter((bus) => bus.status === "Stopped").length;
  const delayed = buses.filter((bus) => bus.status === "Delayed").length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📊 Dashboard</h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h4>🚌</h4>
              <h5>Total Buses</h5>
              <h2>{buses.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h4>🟢</h4>
              <h5>Running</h5>
              <h2>{running}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark shadow">
            <div className="card-body text-center">
              <h4>🟠</h4>
              <h5>Delayed</h5>
              <h2>{delayed}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h4>🔴</h4>
              <h5>Stopped</h5>
              <h2>{stopped}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;