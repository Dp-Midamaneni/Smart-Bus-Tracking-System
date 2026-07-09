import { useEffect, useState } from "react";
import socket from "../socket";
import EditBus from "./EditBus";

function BusList() {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);

  // Fetch buses
  const fetchBuses = () => {
    fetch("http://localhost:5001/buses")
      .then((response) => response.json())
      .then((data) => setBuses(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchBuses();

    socket.on("busUpdated", fetchBuses);

    return () => {
      socket.off("busUpdated", fetchBuses);
    };
  }, []);

  // Delete Bus
  const deleteBus = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;

    try {
      const response = await fetch(`http://localhost:5001/buses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Bus deleted successfully!");
        fetchBuses();
      } else {
        alert("Failed to delete bus.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Edit Bus
  const editBus = (bus) => {
    setSelectedBus(bus);
  };

  // Search
  const filteredBuses = buses.filter((bus) => {
    return (
      bus.busNumber.toLowerCase().includes(search.toLowerCase()) ||
      bus.driverName.toLowerCase().includes(search.toLowerCase()) ||
      bus.route.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        🚌 Bus Management
      </h2>

      {/* Search */}
      <div className="input-group mb-4">
        <span className="input-group-text">🔍</span>

        <input
          type="text"
          className="form-control"
          placeholder="Search by Bus Number, Driver or Route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredBuses.length === 0 ? (

        <div className="alert alert-warning text-center">
          No buses found.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-striped table-hover table-bordered shadow">

            <thead className="table-dark">

              <tr>
                <th>Bus No</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Speed</th>
                <th>ETA</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredBuses.map((bus) => {

                const distance = 10;

                const eta =
                  bus.speed > 0
                    ? Math.ceil((distance / bus.speed) * 60)
                    : "Stopped";

                return (

                  <tr key={bus._id}>

                    <td>{bus.busNumber}</td>

                    <td>{bus.driverName}</td>

                    <td>{bus.route}</td>

                    <td>{bus.speed} km/h</td>

                    <td>
                      {eta === "Stopped"
                        ? "Stopped"
                        : `${eta} min`}
                    </td>

                    <td>

                      <span
                        className={
                          bus.status === "Running"
                            ? "badge bg-success"
                            : bus.status === "Stopped"
                            ? "badge bg-danger"
                            : "badge bg-warning text-dark"
                        }
                      >
                        {bus.status}
                      </span>

                    </td>

                    <td>
                      {new Date(bus.updatedAt).toLocaleString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => editBus(bus)}
                      >
                        ✏ Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteBus(bus._id)}
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

      {selectedBus && (
        <EditBus
          bus={selectedBus}
          onClose={() => setSelectedBus(null)}
          onUpdate={fetchBuses}
        />
      )}

    </div>
  );
}

export default BusList;