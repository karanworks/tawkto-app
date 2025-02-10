import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi } from "../../helper/backend_helper";
import { setItem } from "~/helper/storage";

export const login = createAsyncThunk(
  "login/login",
  async (data: { email: string; password: string }) => {
    try {
      const response = await loginApi(data);

      if (response.data.status === "success") {
        await setItem("user", response.data.data);
        await setItem("workspace", response.data.data.workspace);
        await setItem("access_token", response.data.data.access_token);
      }

      return {
        data: response.data.data,
      };
    } catch (error) {
      console.log("Error while logging in ->", error);
    }
  }
);
