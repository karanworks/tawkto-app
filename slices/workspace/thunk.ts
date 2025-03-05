import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateWorkspace as updateWorkspaceApi } from "~/helper/backend_helper";

export const updateWorkspace = createAsyncThunk(
  "workspace/updateWorkspace",
  async (data: any) => {
    try {
      const response = await updateWorkspaceApi(data);
      return response.data;
    } catch (error) {
      console.log("Error while fetching open chats", error);
    }
  }
);
