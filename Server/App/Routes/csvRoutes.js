import express from "express";
import { downloadCSV } from "../Controllers/csvController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Download the Result(Interview Attempts) Data into CSV Format
router.get("/", authMiddleware, downloadCSV);

export default router;
