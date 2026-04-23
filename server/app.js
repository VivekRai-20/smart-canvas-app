require("dotenv").config();
const connectDB = require("./config/db");

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION ❌ Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION ❌ Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

const express = require("express");
const cors = require("cors");
const drawingRoutes = require("./routes/drawingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", drawingRoutes);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    console.log("Initiating server startup sequence...");
    
    console.log("Step 1: Connecting to database...");
    await connectDB();
    
    console.log("Step 2: Starting Express server...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });
  } catch (error) {
    console.error("Server startup failed ❌", error);
    process.exit(1);
  }
};

startServer();