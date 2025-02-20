import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunk";

const initialState = {
  user: null,
  loading: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const response = action.payload?.data;

      if (response) {
        state.user = response;
      }
    });
  },
});

export default loginSlice.reducer;
