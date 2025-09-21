import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import bugRoutes from "./routes/bugRoutes.js";

dotenv.config();
const app = express();

import cors from "cors";

app.use(
  cors({
    origin: [
      "https://bug-report-tracker-frontend.onrender.com", // deployed frontend
      "http://localhost:5173", // local frontend for testing
    ],
    credentials: true,
  })
);

app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);
app.get("/", (req, res) => {
  res.send("Bug Report Tracker Backend is running!");
});

const PORT = process.env.PORT || 6000;

// MongoDB connect + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
