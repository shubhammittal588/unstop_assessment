import React from "react";
import "./Room.css";

const Room = ({ rooms }) => {
  return (
    <div className="room-visualization">
      {Object.entries(rooms).map(([floor, floorRooms]) => (
        <div key={floor} className="floor">
          <h3>Floor {floor}</h3>
          <div className="rooms">
            {floorRooms.map((room) => (
              <div
                key={room.room}
                className={`room ${room.status === "booked" ? "booked" : "available"}`}
              >
                {room.room}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Room;
