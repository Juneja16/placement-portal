import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./App/Config/database.js";

// Routes
import authRoutes from "./App/Routes/authRoutes.js";
import studentRoutes from "./App/Routes/studentRoutes.js";
import interviewRoutes from "./App/Routes/interviewRoutes.js";
import resultRoutes from "./App/Routes/resultRoutes.js";
import csvRoutes from "./App/Routes/csvRoutes.js";
import jobsRoutes from "./App/Routes/jobsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- STEP 3: STATICS & PATHS SETUP ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// This points to Project_Root/Client/frontend/dist
const buildPath = path.join(__dirname, "../Client/frontend/dist");

// Global Middlewares
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/export", csvRoutes);
app.use("/api/jobs", jobsRoutes);

// --- FRONTEND SERVING LOGIC ---
// 1. Serve the static files from the React build
app.use(express.static(buildPath));

// 2. Catch-all: For any request that doesn't match an /api route,
// send back the React index.html file.
app.get("*all", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Database Connection & Server Start
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connection established.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Serving Frontend from: ${buildPath}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
