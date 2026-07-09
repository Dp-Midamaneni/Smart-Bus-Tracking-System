import { useState } from "react";

function AddBus() {
  const [busNumber, setBusNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [route, setRoute] = useState("");
  const [speed, setSpeed] = useState("");

  const addBus = async () => {
    const response = await fetch("http://localhost:5001/buses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        busNumber,
        driverName,
        route,
        currentLocation: {
          latitude: 17.385,
          longitude: 78.4867,
        },
        speed: Number(speed),
        status: "Running",
      }),
    });

    if (response.ok) {
      alert("Bus Added Successfully!");

      setBusNumber("");
      setDriverName("");
      setRoute("");
      setSpeed("");
    } else {
      alert("Failed to add bus");
    }
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Add New Bus</h2>

      <input
        type="text"
        placeholder="Bus Number"
        value={busNumber}
        onChange={(e) => setBusNumber(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Driver Name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Route"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Speed"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
      />

      <br /><br />

      <button onClick={addBus}>
        Add Bus
      </button>
    </div>
  );
}

export default AddBus;