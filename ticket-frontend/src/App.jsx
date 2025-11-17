import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import QueuePage from "./pages/QueuePage";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import SeatSelect from "./pages/SeatSelect";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />


        <Route path="/login" element={<Login />} />
        <Route path="/queue" element={<QueuePage />} />

        <Route path="/events" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/event/:id/seat" element={<SeatSelect />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
