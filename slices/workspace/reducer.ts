import { createSlice } from "@reduxjs/toolkit";
import { Workspace } from "~/.expo/types/types";
import { updateWorkspace } from "./thunk";

interface InitialStateType {
  workspace: Workspace | null;
  error: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  workspace: null,
  error: "",
  loading: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateWorkspace.fulfilled, (state, action) => {
      const response = action.payload;
      console.log("UPDATE WORKSPACE RESPONSE ->", response);

      // if (response.status === "success") {
      //   state.workspace = response.data;
      // }
    });
  },
});

export default workspaceSlice.reducer;
