import React, { useState } from "react";

const RoomReservationForm = ({ refreshRooms }) => {
  const [roomCount, setRoomCount] = useState(1);

  const bookRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rooms: roomCount }),
      });
      const result = await response.json();
      alert(result.message || "Rooms booked successfully!");
      refreshRooms();
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  const resetBookings = async () => {
    try {
      await fetch("http://localhost:5000/api/reset", { method: "POST" });
      alert("All rooms have been reset.");
      refreshRooms();
    } catch (error) {
      console.error("Reset error:", error);
    }
  };

  const generateRandomOccupancy = async () => {
    try {
      await fetch("http://localhost:5000/api/generate-random-occupancy", { method: "POST" });
      alert("Random room occupancy generated.");
      refreshRooms();
    } catch (error) {
      console.error("Error generating random occupancy:", error);
    }
  };

  return (
    <div className="booking-form">
      <label>
        Select Rooms:
        <input
          type="number"
          value={roomCount}
          onChange={(e) => setRoomCount(Math.max(1, Math.min(5, Number(e.target.value))))}
          min="1"
          max="5"
        />
      </label>
      <button onClick={bookRooms}>Book</button>
      <button onClick={resetBookings}>Reset All</button>
      <button onClick={generateRandomOccupancy}>Random Booking</button>
    </div>
  );
};

export default RoomReservationForm;
