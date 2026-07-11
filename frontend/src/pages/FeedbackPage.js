import FeedbackForm from "../components/FeedbackForm";

function FeedbackPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 className="mb-4">💬 Passenger Feedback</h2>

      <FeedbackForm />
    </div>
  );
}

export default FeedbackPage;