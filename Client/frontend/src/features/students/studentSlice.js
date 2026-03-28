import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setStudents: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setStudents, setLoading } = studentSlice.actions;
export default studentSlice.reducer;