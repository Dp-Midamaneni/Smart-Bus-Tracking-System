import AddBus from "../components/AddBus";
import BusList from "../components/BusList";

function BusPage() {
  return (
    <div style={{ padding: "20px" }}>
      <AddBus />

      <br />

      <BusList />
    </div>
  );
}

export default BusPage;