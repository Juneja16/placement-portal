import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import studentReducer from "../features/students/studentSlice.js";
import interviewReducer from "../features/interviews/interviewSlice.js";
import resultReducer from "../features/results/resultSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    interviews: interviewReducer,
    results: resultReducer,
  },
});
