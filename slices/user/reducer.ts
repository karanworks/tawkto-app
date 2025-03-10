import { createSlice } from "@reduxjs/toolkit";
import { UpdateUser } from "~/.expo/types/types";
import { updateUser } from "./thunk";

interface InitialStateType {
  user: UpdateUser | null;
  error: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  user: null,
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const response = action.payload;

      if (response.status === "success") {
        state.user = response.data;
      }
    });
  },
});

export default userSlice.reducer;
