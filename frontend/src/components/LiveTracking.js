import { useState } from "react";

function LiveTracking() {
  const [loading, setLoading] = useState(false);

  const moveBus = async () => {
    setLoading(true);

    try {
      // Get all buses
      const response = await fetch("http://localhost:5001/buses");
      const buses = await response.json();

      if (buses.length === 0) {
        alert("No buses found.");
        setLoading(false);
        return;
      }

      // Move the first bus
      const bus = buses[0];

      const newLatitude = bus.currentLocation.latitude + 0.001;
      const newLongitude = bus.currentLocation.longitude + 0.001;

      await fetch(`http://localhost:5001/buses/${bus._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentLocation: {
            latitude: newLatitude,
            longitude: newLongitude,
          },
          speed: bus.speed + 5,
        }),
      });

      alert("Bus moved successfully!");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      <button
        onClick={moveBus}
        disabled={loading}
        style={{
          padding: "12px 25px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Moving..." : "Move Bus"}
      </button>
    </div>
  );
}

export default LiveTracking;