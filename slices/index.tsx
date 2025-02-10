import { combineReducers } from "@reduxjs/toolkit";

import LoginReducer from "./login/reducer";
import ChatsReducer from "./chats/reducer";
import InboxReducer from "./inbox/reducer";

const rootReducer = combineReducers({
  Login: LoginReducer,
  Chats: ChatsReducer,
  Inbox: InboxReducer,
});

export default rootReducer;
