const express = require("express");
const app = express();
const cors = require("cors");
const roomRoutes = require("../server/routes/room");
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use("/api", roomRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
