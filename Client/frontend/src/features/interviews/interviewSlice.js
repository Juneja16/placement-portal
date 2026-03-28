import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
  name: "interviews",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setInterviews: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setInterviews, setLoading } = interviewSlice.actions;
export default interviewSlice.reducer;