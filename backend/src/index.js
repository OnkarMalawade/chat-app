import express from "express";
import dotenv from "dotenv"; 
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Middleware
app.use(express.json({ limit: "10mb" })); // Handles JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Handles URL-encoded data
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Start server
app.listen(PORT, () => {
  console.log("Backend server is running! http://localhost:" + PORT);
  connectDB(); // Ensure database connection is initialized
});
