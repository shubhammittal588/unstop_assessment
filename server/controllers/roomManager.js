const rooms = require("../models/rooms");

/**
 * Handles room reservations following priority rules.
 */
const reserveRooms = (req, res) => {
  const roomsRequested = parseInt(req.body.rooms, 10);
  if (roomsRequested < 1 || roomsRequested > 5) {
    return res.status(400).json({ error: "You can reserve between 1 and 5 rooms only." });
  }

  let allocatedRooms = [];
  const availableRooms = JSON.parse(JSON.stringify(rooms));

  // Priority: Assign rooms on the same floor first
  for (const floor in availableRooms) {
    const freeRooms = availableRooms[floor].filter((room) => room.status === "available");
    if (freeRooms.length >= roomsRequested) {
      allocatedRooms = freeRooms.slice(0, roomsRequested);
      break;
    }
  }

  // Secondary: Assign across floors, minimizing dispersion
  if (allocatedRooms.length < roomsRequested) {
    for (const floor in availableRooms) {
      const freeRooms = availableRooms[floor].filter((room) => room.status === "available");
      while (freeRooms.length && allocatedRooms.length < roomsRequested) {
        allocatedRooms.push(freeRooms.shift());
      }
    }
  }

  // Update room status in original dataset
  allocatedRooms.forEach((room) => {
    for (const floor in rooms) {
      const index = rooms[floor].findIndex((r) => r.room === room.room);
      if (index > -1) rooms[floor][index].status = "booked";
    }
  });

  res.status(200).json({ reservedRooms: allocatedRooms, message: "Reservation successful" });
};

/**
 * Resets all rooms to available.
 */
const clearReservations = (req, res) => {
  for (const floor in rooms) {
    rooms[floor] = rooms[floor].map((room) => ({ ...room, status: "available" }));
  }
  res.status(200).json({ message: "All reservations have been cleared." });
};

/**
 * Assigns random room occupancy.
 */
const assignRandomOccupancy = (req, res) => {
  for (const floor in rooms) {
    rooms[floor].forEach((room) => {
      room.status = Math.random() > 0.7 ? "booked" : "available"; // 30% chance of being booked
    });
  }
  res.status(200).json({ message: "Random occupancy generated." });
};

/**
 * Fetches all room details.
 */
const fetchAllRooms = (req, res) => {
  res.status(200).json(rooms);
};

module.exports = { reserveRooms, clearReservations, assignRandomOccupancy, fetchAllRooms };
