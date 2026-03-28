import express from "express";
import {
  createStudent,
  getStudents,
  updateStudent,
} from "../Controllers/studentController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import Student from "../Models/Student.js";

const router = express.Router();

// Create the Student
router.post("/", authMiddleware, createStudent);

// Fetch the List of all the Students
router.get("/", authMiddleware, getStudents);

// Update the Specific Student of the Given Id with the Given data
router.put("/:id", authMiddleware, updateStudent);

// Bulk import endpoint
router.post("/bulk", authMiddleware, async (req, res) => {
  try {
    const students = req.body;
    const inserted = await Student.insertMany(students);
    res.status(201).json({
      success: true,
      message: `Imported ${inserted.length} students successfully`,
      data: inserted,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
