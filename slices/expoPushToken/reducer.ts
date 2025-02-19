import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationToken: null,
  error: "",
};

const expoPushTokenSlice = createSlice({
  name: "expoPushToken",
  initialState,
  reducers: {
    setNotificatnonExpoPushToken(state, action) {
      state.notificationToken = action.payload;
    },
  },
});

export const { setNotificatnonExpoPushToken } = expoPushTokenSlice.actions;
export default expoPushTokenSlice.reducer;
