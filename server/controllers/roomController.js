const hotel = require("../models/hotel");

/**
 * Book rooms based on input and rules.
 */
const bookRooms = (req, res) => {
  const requestedRooms = parseInt(req.body.rooms, 10);
  if (requestedRooms > 5 || requestedRooms < 1) {
    return res.status(400).json({ error: "You can book between 1 to 5 rooms only." });
  }

  const selectedRooms = [];
  const availableRooms = JSON.parse(JSON.stringify(hotel));

  // Priority: Same floor booking
  for (const floor in availableRooms) {
    const floorRooms = availableRooms[floor].filter((r) => r.status === "available");
    if (floorRooms.length >= requestedRooms) {
      selectedRooms.push(...floorRooms.slice(0, requestedRooms));
      break;
    }
  }

  // Secondary: Cross-floor booking minimizing travel time
  if (selectedRooms.length < requestedRooms) {
    for (const floor in availableRooms) {
      const floorRooms = availableRooms[floor].filter((r) => r.status === "available");
      while (floorRooms.length && selectedRooms.length < requestedRooms) {
        selectedRooms.push(floorRooms.shift());
      }
    }
  }

  // Update room status
  selectedRooms.forEach((room) => {
    for (const floor in hotel) {
      const idx = hotel[floor].findIndex((r) => r.room === room.room);
      if (idx > -1) hotel[floor][idx].status = "booked";
    }
  });

  res.status(200).json({ bookedRooms: selectedRooms, message: "Booking successful" });
};

/**
 * Reset all room statuses to 'available'.
 */
const resetBookings = (req, res) => {
  for (const floor in hotel) {
    hotel[floor] = hotel[floor].map((r) => ({ ...r, status: "available" }));
  }
  res.status(200).json({ message: "All bookings have been reset." });
};

/**
 * Generate random room occupancy.
 */
const generateRandomOccupancy = (req, res) => {
  for (const floor in hotel) {
    hotel[floor].forEach((r) => {
      r.status = Math.random() > 0.7 ? "booked" : "available"; // 30% chance to be booked
    });
  }
  res.status(200).json({ message: "Random occupancy generated." });
};
const getAllRooms = (req, res) => {
  res.status(200).json(hotel);
};

module.exports = { bookRooms, resetBookings, generateRandomOccupancy,getAllRooms };
