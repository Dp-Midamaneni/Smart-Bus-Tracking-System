function WelcomeBanner() {
  const driver = JSON.parse(localStorage.getItem("driver"));

  return (
    <div className="welcome-banner">
      <div>
        <h1>Welcome Back 👋</h1>

        <p>Ready for today's journey?</p>
      </div>

      <div className="welcome-info">
        <div>
          <h3>{driver?.busNumber || "--"}</h3>

          <small>Bus Number</small>
        </div>

        <div>
          <h3>Available</h3>

          <small>Status</small>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
