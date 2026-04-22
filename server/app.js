require("dotenv").config();
const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
const drawingRoutes = require("./routes/drawingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", drawingRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});