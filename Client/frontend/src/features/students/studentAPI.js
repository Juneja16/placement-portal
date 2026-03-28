import api from "../../services/api";

// Get all students
export const fetchStudents = () => api.get("/students");

// Create student
export const createStudent = (data) => api.post("/students", data);