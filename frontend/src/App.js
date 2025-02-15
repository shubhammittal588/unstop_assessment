import React, { useState, useEffect } from "react";
import Room from "./components/Room";
import RoomReservationForm from "./components/RoomReservationForm";

const App = () => {
  const [rooms, setRooms] = useState({});

  const refreshRooms = async () => {
    const response = await fetch("http://localhost:5000/api/rooms");
    const data = await response.json();
    setRooms(data);
  };

  useEffect(() => {
    refreshRooms();
  }, []);

  return (
    <div className="app">
      <h1>Hotel Room Reservation System</h1>
      <RoomReservationForm refreshRooms={refreshRooms} />
      <Room rooms={rooms} />
    </div>
  );
};

export default App;
