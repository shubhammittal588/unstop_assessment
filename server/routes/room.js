const express = require("express");
const router = express.Router();
const { bookRooms, resetBookings, generateRandomOccupancy,getAllRooms } = require("../controllers/roomController");

router.post("/book", bookRooms);
router.get('/rooms',getAllRooms)
router.post("/reset", resetBookings);
router.post("/generate-random-occupancy", generateRandomOccupancy);

module.exports = router;
