import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState:{
        messages:[]
    },
    reducers: {
      addMessage: (state, action) => {
        state.messages.push(action.payload);
        return state
      },
    },
  });


  export default messagesSlice;
  export const messageAction=messagesSlice.actions

