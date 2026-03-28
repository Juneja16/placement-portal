import api from "../../services/api";

// Fetch all students for an interview
export const fetchInterviewResults = (interviewId) =>
  api.get(`/results/interview/${interviewId}`);

// Update result status
export const updateResultStatus = (resultId, data) =>
  api.put(`/results/${resultId}`, data);

export const allocateStudent = (data) => api.post("/results", data);

export const fetchAllResults = () => api.get("/results");
