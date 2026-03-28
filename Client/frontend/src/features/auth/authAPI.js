import api from "../../services/api";

// 🔐 Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// 🔐 Signup
export const signupUser = (data) => {
  return api.post("/auth/signup", data);
};