import api from "../../services/api";

// Fetch jobs from backend proxy
export const fetchJobs = () => api.get("/jobs");