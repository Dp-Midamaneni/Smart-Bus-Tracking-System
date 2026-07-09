import { useState, useEffect } from "react";

function EditBus({ bus, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    busNumber: "",
    driverName: "",
    route: "",
    speed: "",
    status: "Running",
  });

  useEffect(() => {
    if (bus) {
      setFormData({
        busNumber: bus.busNumber,
        driverName: bus.driverName,
        route: bus.route,
        speed: bus.speed,
        status: bus.status,
      });
    }
  }, [bus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5001/buses/${bus._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Bus updated successfully!");
        onUpdate();
        onClose();
      } else {
        alert("Failed to update bus.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "450px",
        }}
      >
        <h3 className="mb-3">
          ✏ Edit Bus
        </h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="busNumber"
            placeholder="Bus Number"
            value={formData.busNumber}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="driverName"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="route"
            placeholder="Route"
            value={formData.route}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="number"
            name="speed"
            placeholder="Speed"
            value={formData.speed}
            onChange={handleChange}
          />

          <select
            className="form-control mb-3"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Running</option>
            <option>Delayed</option>
            <option>Stopped</option>
          </select>

          <button
            className="btn btn-success me-2"
            type="submit"
          >
            Save
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditBus;