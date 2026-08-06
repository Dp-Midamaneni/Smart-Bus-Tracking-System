import { useState } from "react";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const sendFeedback = async () => {
    if (!name || !busNumber || !rating || !message) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          busNumber,
          rating: Number(rating),
          message,
        }),
      });

      if (response.ok) {
        alert("✅ Feedback submitted successfully!");

        setName("");
        setBusNumber("");
        setRating("");
        setMessage("");
      } else {
        alert("❌ Failed to submit feedback.");
      }
    } catch (error) {
      console.log(error);
      alert("❌ Server Error");
    }
  };

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
      <div className="card-body p-4">

        <h3
          style={{
            color: "#2563EB",
            fontWeight: "700",
            marginBottom: "25px",
          }}
        >
          💬 Passenger Feedback
        </h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Passenger Name
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Bus Number
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Example: APSRTC-205"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Rating
          </label>

          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select Rating</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Poor</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Feedback
          </label>

          <textarea
            className="form-control"
            rows="6"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              resize: "none",
              borderRadius: "12px",
            }}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          style={{
            borderRadius: "12px",
            padding: "12px",
            fontWeight: "600",
          }}
          onClick={sendFeedback}
        >
          Submit Feedback
        </button>

      </div>
    </div>
  );
}

export default FeedbackForm;