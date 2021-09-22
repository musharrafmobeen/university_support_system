import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getChatsURL = configData.url.getChatsUrl;
const url = `${baseUrl}${getChatsURL}`;

const slice = createSlice({
    name: "chats",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        chatsRequested: (chats, action) => {
            chats.isError = false;
            chats.errorMessage = "";
            chats.loading = true;
        },
        chatsReceived: (chats, action) => {
            chats.list = action.payload.messages;
            chats.isError = false;
            chats.errorMessage = "";
            chats.loading = false;
        },
        chatsRequestFailed: (chats, action) => {
            chats.isError = false;
            chats.errorMessage = "";
            chats.loading = false;
        },
        chatAdditionRequested: (chats, action) => {
            chats.isError = false;
            chats.errorMessage = "";
            chats.loading = false;
        },
        chatAdded: (chats, action) => {
            chats.isError = false;
            chats.errorMessage = "";
            chats.loading = false;
        },
        chatAdditionFialed: (chats, action) => {
            chats.isError = false;
            chats.errorMessage = "";
            chats.loading = false;
        },
    }
});


const {
    chatsRequested,
    chatsReceived,
    chatsRequestFailed,
    chatAdditionRequested,
    chatAdded,
    chatAdditionFialed
} = slice.actions;

export const loadChats = () => apiCallBegan({
    url,
    onStart: chatsRequested.type,
    onSuccess: chatsReceived.type,
    onError: chatsRequestFailed.type
});

export const addChat = (chat) => apiCallBegan({
    url,
    method: "post",
    data: {
        ...chat
    },
    onStart: chatAdditionRequested.type,
    onSuccess: chatAdded.type,
    onError: chatAdditionFialed.type
});


export default slice.reducer;