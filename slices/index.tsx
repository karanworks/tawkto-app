import { combineReducers } from "@reduxjs/toolkit";

import LoginReducer from "./login/reducer";
import ChatsReducer from "./chats/reducer";
import InboxReducer from "./inbox/reducer";
import WorkspaceReducer from "./workspace/reducer";
import UserReducer from "./user/reducer";

const rootReducer = combineReducers({
  Login: LoginReducer,
  Chats: ChatsReducer,
  Inbox: InboxReducer,
  Workspace: WorkspaceReducer,
  User: UserReducer,
});

export default rootReducer;
