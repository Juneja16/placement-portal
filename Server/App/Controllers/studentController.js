import Student from "../models/Student.js";

/* 

 Create Student 
  1. Take the Info 
  2. validate 
  3. Save it into Database

 View All Students 
 1.  Fetch all and optional filter (batch) 
 2. Return the list 

 Update Student 
 1. Find the student by Id
 2. Update the Credentials
 3. Return the Updated User 
 
   Auth Protected CRUD
     + Filtering (batch)
     + Validation (via schema)
  */

// CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const { name, college, batch, status, scores } = req.body;

    const student = await Student.create({
      name,
      college,
      batch,
      status,
      scores,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL STUDENTS (with optional batch filter)  and Sorting by Student Created Time  latest First
export const getStudents = async (req, res) => {
  try {
    const { batch } = req.query;

    let filter = {};

    if (batch) {
      filter.batch = batch;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
