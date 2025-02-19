import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUnassignedChats as getUnassignedChatsApi,
  getUnassignedChatMessages as getUnassignedChatMessagesApi,
  getSolvedChats as getSolvedChatsApi,
  getSolvedChatMessages as getSolvedChatMessagesApi,
  updateSolvedChat as updateSolvedChatApi,
} from "~/helper/backend_helper";

export const getUnassignedChats = createAsyncThunk(
  "inbox/getUnassignedChats",
  async (data: any) => {
    try {
      const response = await getUnassignedChatsApi(data);

      return response.data;
    } catch (error) {
      console.log("Error while fetching open chats", error);
    }
  }
);
export const getUnassignedChatMessages = createAsyncThunk(
  "inbox/getUnassignedChatMessages",
  async (data: any) => {
    try {
      const response = await getUnassignedChatMessagesApi(data);
      return response.data;
    } catch (error) {
      console.log("Error while fetching chat messages", error);
    }
  }
);
export const updateSolvedChat = createAsyncThunk(
  "inbox/updateSolvedChat",
  async (data: any) => {
    try {
      const response = await updateSolvedChatApi(data);

      return response.data;
    } catch (error) {
      console.log("Error while updating solved chat", error);
    }
  }
);
export const getSolvedChats = createAsyncThunk(
  "inbox/getSolvedChats",
  async (data: any) => {
    try {
      const response = await getSolvedChatsApi(data);

      return response.data;
    } catch (error) {
      console.log("Error while fetching open chats", error);
    }
  }
);
export const getSolvedChatMessages = createAsyncThunk(
  "inbox/getSolvedChatMessages",
  async (data: any) => {
    try {
      const response = await getSolvedChatMessagesApi(data);

      return response.data;
    } catch (error) {
      console.log("Error while fetching chat messages", error);
    }
  }
);
