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

const updateSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const response = action.payload;
      console.log("UPDATE USER RESPONSE ->", response);

      // if (response.status === "success") {
      //   state.workspace = response.data;
      // }
    });
  },
});

export default updateSlice.reducer;
