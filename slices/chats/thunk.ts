import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChats as getChatsApi,
  getChatMessages as getChatMessagesApi,
} from "~/helper/backend_helper";

export const getChats = createAsyncThunk(
  "chats/getChats",
  async (data: any) => {
    try {
      const response = await getChatsApi(data);
      return response.data;
    } catch (error) {
      console.log("Error while fetching open chats", error);
    }
  }
);
export const getChatMessages = createAsyncThunk(
  "chats/getChatMessages",
  async (data: any) => {
    try {
      const response = await getChatMessagesApi(data);
      console.log("GOT THE CHAT MESSAGES IN THUNK", response);
      return response.data;
    } catch (error) {
      console.log("Error while fetching chat messages", error);
    }
  }
);
