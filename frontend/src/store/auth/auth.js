import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from '../api';
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getAuth = configData.url.getAuthUrl;
const url = `${baseUrl}${getAuth}`;
const getMeUrl = configData.url.getMeUrl;
const headers = configData.headers;

const slice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        role: "",
        isError: false,
        errorMessage: "",
        loading: false,
        loggedIn: false
    },
    reducers: {
        authRequested: (auth, action) => {
            auth.isError = false;
            auth.errorMessage = "";
            // console.log("headers", { ...headers });
            auth.loggedIn = false;
            auth.loading = true;
        },
        authRecieved: (auth, action) => {
            auth.role = action.payload.userType;
            switch (auth.role) {
                case 'Admin':
                    auth.user = action.payload.admin;
                    break;
                case 'Student':
                    auth.user = action.payload.student;
                    break;
                case 'employee':
                    auth.user = action.payload.employee;
                    break;
                case 'Staff':
                    auth.user = action.payload.staff;
                    break;
            };
            // auth.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
            auth.isError = false;
            auth.errorMessage = "";
            auth.loggedIn = true;
            auth.loading = false;
            localStorage.setItem("loggedIn", auth.loggedIn);
        },
        authRequestFailed: (auth, action) => {
            auth.isError = true;
            auth.errorMessage = action.payload.message;
            auth.loggedIn = false;
            auth.token = "";
            localStorage.setItem("loggedIn", auth.loggedIn);
            localStorage.setItem("token", auth.token);
            auth.loading = false;
        },
        currentAuthRecieved: (auth, action) => {
            auth.user = action.payload.userData;
            auth.role = action.payload.userType;
            auth.token = action.payload.token;
            auth.loggedIn = true;
            auth.loading = false;
            auth.isError = false;
            auth.errorMessage = "";
            localStorage.setItem("token", auth.token);
            localStorage.setItem("loggedIn", auth.loggedIn);
        },
        authLoggedOut: (auth, action) => {
            auth.user = {};
            auth.loggedIn = false;
            auth.token = "";
            localStorage.setItem("loggedIn", auth.loggedIn);
            localStorage.setItem("token", auth.token);
            auth.loading = false;
        },
    }
});

const {
    authRequested,
    authRecieved,
    authRequestFailed,
    currentAuthRecieved,
    // authLoggedOut,
} = slice.actions;

export const { authLoggedOut } = slice.actions;

export const authenticateUser = (email, passWord) => apiCallBegan({
    url,
    method: "post",
    data: {
        "email": email,
        "password": passWord,
    },
    // headers: {
    //     ...headers,
    // },
    onStart: authRequested.type,
    onSuccess: authRecieved.type,
    onError: authRequestFailed.type,
});


export const getCurrentAuth = accessToken => apiCallBegan({
    url: getMeUrl,
    method: "post",
    headers: {
        "Authorization": `Bearer ${accessToken}`,
    },
    onStart: authRequested.type,
    onSuccess: currentAuthRecieved.type,
    onError: authRequestFailed.type,
});

export default slice.reducer;