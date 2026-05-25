import { useState } from "react";

function FeedbackForm() {

  const [rating, setRating] = useState("");

  const sendFeedback = async () => {

    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rating })
    });

    const data = await response.text();

    alert(data);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Bus Feedback Form</h2>

      <input
        type="number"
        placeholder="Enter rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button onClick={sendFeedback}>
        Submit
      </button>

    </div>
  );
}

export default FeedbackForm;