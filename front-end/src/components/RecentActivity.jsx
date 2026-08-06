function RecentActivity() {
  return (
    <div className="activity-card">
      <div className="card-title">
        <h2>Recent Activity</h2>
      </div>

      <div className="activity-list">
        <div className="activity">
          <div className="activity-dot"></div>

          <div className="activity-content">
            <h4>Driver Logged In</h4>
            <small>2 minutes ago</small>
          </div>
        </div>

        <div className="activity">
          <div className="activity-dot"></div>

          <div className="activity-content">
            <h4>GPS Connected</h4>
            <small>1 minute ago</small>
          </div>
        </div>

        <div className="activity">
          <div className="activity-dot"></div>

          <div className="activity-content">
            <h4>Waiting to Start Trip</h4>
            <small>Now</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
