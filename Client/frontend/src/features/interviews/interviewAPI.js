import api from "../../services/api";

// Fetch all interviews
export const fetchInterviews = () => api.get("/interviews");

// Create interview
export const createInterview = (data) => api.post("/interviews", data);