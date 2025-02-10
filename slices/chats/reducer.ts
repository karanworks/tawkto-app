import { createSlice } from "@reduxjs/toolkit";
import { getChats, getChatMessages } from "./thunk";

const initialState = {
  chats: [],
  activeChat: null,
  error: "",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        state.chats = response.data;
      }
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status === "success") {
        state.activeChat = response.data;
      }
    });
  },
});

export default chatsSlice.reducer;
