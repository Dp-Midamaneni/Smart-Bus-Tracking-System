import {
  FaBus,
  FaMapMarkerAlt,
  FaRoute,
  FaTachometerAlt,
} from "react-icons/fa";

function StatusCards() {
  const cards = [
    {
      icon: <FaBus />,
      title: "Bus",
      value: "TS09AB1234",
    },

    {
      icon: <FaMapMarkerAlt />,
      title: "GPS",
      value: "Connected",
    },

    {
      icon: <FaTachometerAlt />,
      title: "Speed",
      value: "0 km/h",
    },

    {
      icon: <FaRoute />,
      title: "Trip",
      value: "Waiting",
    },
  ];

  return (
    <div className="status-grid">
      {cards.map((card, index) => (
        <div className="status-card" key={index}>
          <div className="status-icon">{card.icon}</div>

          <div>
            <small>{card.title}</small>

            <h3>{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatusCards;
