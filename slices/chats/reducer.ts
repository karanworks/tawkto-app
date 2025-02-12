import { createSlice } from "@reduxjs/toolkit";
import { getChats, getChatMessages } from "./thunk";
import { ChatType } from "~/.expo/types/types";

interface InitialStateType {
  chats: ChatType[] | [];
  activeChat: ChatType | null;
  error: string;
}

const initialState: InitialStateType = {
  chats: [],
  activeChat: null,
  error: "",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    handleActiveChat(state, action) {
      state.activeChat = action.payload;
    },

    handleAddChat(state, action) {
      state.chats = [action.payload, ...state.chats];
    },

    handleIncomingMessageUpdate(state, action) {
      const newMessage = action.payload;

      state.chats = state.chats.map((chat) => {
        if (newMessage.chatId === chat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        } else {
          return chat;
        }
      });

      if (state.activeChat && newMessage.chatId === state.activeChat.id) {
        state.activeChat = {
          ...state.activeChat,
          messages: [...state.activeChat.messages, newMessage],
        };
      }
    },
  },
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

export const { handleIncomingMessageUpdate, handleActiveChat, handleAddChat } =
  chatsSlice.actions;
export default chatsSlice.reducer;
