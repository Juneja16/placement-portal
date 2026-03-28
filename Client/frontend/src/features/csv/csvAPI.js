import api from "../../services/api";

// 🔥 Download CSV file
export const downloadCSV = () =>
  api.get("/export", { responseType: "blob" });