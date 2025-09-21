import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import bugRoutes from "./routes/bugRoutes.js";

dotenv.config();
const app = express();

// CORS middleware
app.use(
  cors({
    origin: [
      "https://bug-report-tracker-frontend.onrender.com", // deployed frontend
      "http://localhost:5173", // local frontend for testing
    ],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Bug Report Tracker Backend is running!");
});

// MongoDB connect + server start
const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
