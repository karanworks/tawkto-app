import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser as updateUserApi } from "~/helper/backend_helper";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: any) => {
    try {
      const response = await updateUserApi(data);
      return response.data;
    } catch (error) {
      console.log("Error while updating user", error);
    }
  }
);
