import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "results",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setResults: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setResults, setLoading } = resultSlice.actions;
export default resultSlice.reducer;