import { createSlice } from "@reduxjs/toolkit";
import {
  getUnassignedChats,
  getUnassignedChatMessages,
  getSolvedChats,
  getSolvedChatMessages,
  updateSolvedChat,
} from "./thunk";

const initialState = {
  unassignedChats: [],
  solvedChats: [],
  unassingedActiveChat: null,
  solvedActiveChat: null,
  unassignedChatCount: 0,
  solvedChatCount: 0,
  error: "",
};

const chatsSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnassignedChats.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        state.unassignedChats = response.data;
      }
    });
    builder.addCase(getUnassignedChatMessages.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        state.unassingedActiveChat = response.data;
      }
    });
    builder.addCase(updateSolvedChat.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        // DO SOMETHING
      }
    });
    builder.addCase(getSolvedChats.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        state.solvedChats = response.data;
      }
    });
    builder.addCase(getSolvedChatMessages.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        state.solvedActiveChat = response.data;
      }
    });
  },
});

export default chatsSlice.reducer;
