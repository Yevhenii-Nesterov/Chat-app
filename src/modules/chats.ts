import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import chatsApi, {Chat, newMessage} from "../models/ChatsAPI";

const initialState: {
  chats: Chat[],
  error: string | null,
  loading: boolean,
} = {
  chats: [],
  error: null,
  loading: false
};

const getChats = createAsyncThunk('chats/getChats', async (update: boolean = false) => {
  return update ? chatsApi.getUpdates() : chatsApi.loadChats();
});

const putMessage = createAsyncThunk('chats/putMessage', async (message: newMessage) => {
  return chatsApi.putMessage(message);
});


const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getChats.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getChats.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.chats = action.payload;

    });

    builder.addCase(getChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Unknown error';
    });

    builder.addCase(putMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const {chatId, ...message} = action.payload;

      const chat = state.chats?.find((chat) => chat.id === chatId);

      if (!chat) {
        console.error('Unknown chat ' + chatId);
        return;
      }
      chat.messages.push(message);
    });
  })
});

export default chatsSlice.reducer;

export {getChats, putMessage};