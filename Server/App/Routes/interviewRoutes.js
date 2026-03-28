import express from "express";
import {
  createInterview,
  getInterviews,
} from "../Controllers/interviewController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import Interview from "../Models/Interview.js";

const router = express.Router();

// Create the Interview of the Specific Company
router.post("/", authMiddleware, createInterview);

// List down all the Interviews
router.get("/", authMiddleware, getInterviews);

//  Bulk Imports
router.post("/bulk", authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.insertMany(req.body);
    res.status(201).json({
      success: true,
      count: interviews.length,
      data: interviews,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
