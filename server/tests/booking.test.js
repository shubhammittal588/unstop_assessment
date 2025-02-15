const request = require("supertest");
const app = require("../index");

describe("Room Booking System", () => {
  test("Book 3 rooms on the same floor", async () => {
    const res = await request(app).post("/api/book").send({ rooms: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.bookedRooms.length).toBe(3);
  });

  test("Reset all bookings", async () => {
    const res = await request(app).post("/api/reset");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("All bookings have been reset.");
  });

  test("Generate random occupancy", async () => {
    const res = await request(app).post("/api/generate-random-occupancy");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Random occupancy generated.");
  });

  test("Invalid room booking request", async () => {
    const res = await request(app).post("/api/book").send({ rooms: 6 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("You can book between 1 to 5 rooms only.");
  });
});
