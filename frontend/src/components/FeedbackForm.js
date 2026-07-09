import { useState } from "react";

function FeedbackForm() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendFeedback = async () => {

    const response = await 
    fetch("http://localhost:5001/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        message
      })
    });

    const data = await response.text();

    alert(data);
  };

  return (
    <div>

      <h1>Feedback Form</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Enter Feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={sendFeedback}>
        Submit
      </button>

    </div>
  );
}

export default FeedbackForm;