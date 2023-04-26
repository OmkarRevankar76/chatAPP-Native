import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./Messages";
export const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
});
