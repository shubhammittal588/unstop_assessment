const hotel = {
    1: Array.from({ length: 10 }, (_, i) => ({ room: 101 + i, status: "available" })),
    2: Array.from({ length: 10 }, (_, i) => ({ room: 201 + i, status: "available" })),
    3: Array.from({ length: 10 }, (_, i) => ({ room: 301 + i, status: "available" })),
    4: Array.from({ length: 10 }, (_, i) => ({ room: 401 + i, status: "available" })),
    5: Array.from({ length: 10 }, (_, i) => ({ room: 501 + i, status: "available" })),
    6: Array.from({ length: 10 }, (_, i) => ({ room: 601 + i, status: "available" })),
    7: Array.from({ length: 10 }, (_, i) => ({ room: 701 + i, status: "available" })),
    8: Array.from({ length: 10 }, (_, i) => ({ room: 801 + i, status: "available" })),
    9: Array.from({ length: 10 }, (_, i) => ({ room: 901 + i, status: "available" })),
    10: Array.from({ length: 7 }, (_, i) => ({ room: 1001 + i, status: "available" })),
  };
  
  module.exports = hotel;
  