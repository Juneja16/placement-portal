import axios from "axios";

const api = axios.create({
  // This automatically uses the domain you are hosted on
  // e.g., https://your-app.onrender.com/api
  baseURL: "/api",
});

// 🔥 Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
