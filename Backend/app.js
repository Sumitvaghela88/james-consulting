require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authroutes");
const serviceRoutes = require("./routes/service");
const { seedServices } = require('./seeders/serviceSeeder');

const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// Middleware                                       
app.use(express.json());

// Seed services
seedServices();

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Services API is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

// Connect to MongoDB
connectDB();

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
