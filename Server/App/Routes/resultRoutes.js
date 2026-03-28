import express from "express";
import {
  allocateStudent,
  getAllResults,
  getInterviewResults,
  updateResult,
} from "../Controllers/resultController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Allocate
router.post("/", authMiddleware, allocateStudent);

// Update result
router.put("/:id", authMiddleware, updateResult);

// Get interview students
router.get("/interview/:id", authMiddleware, getInterviewResults);

// Fetch all the Interview Attempts
router.get("/", authMiddleware, getAllResults);

export default router;
