import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from '../api';
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getAdminURL = configData.url.getAdminUrl;
const url = `${baseUrl}${getAdminURL}`;


const slice = createSlice({
    name: "admins",
    initialState: {
        loading: false,
    },
    reducers: {
        adminUpdationRequested: (admins, action) => { admins.loading = true; },
        adminupdated: (admins, action) => { admins.loading = false; },
        adminUpdationFailed: (admins, action) => { admins.loading = true; },
    }
});

const {
    adminUpdationRequested,
    adminupdated,
    adminUpdationFailed
} = slice.actions;

export const updateAdmin = (adminId, admin) => apiCallBegan({
    url: `${url}/${adminId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...admin
    },
    onStart: adminUpdationRequested.type,
    onSuccess: adminupdated.type,
    onError: adminUpdationFailed.type
});

export default slice.reducer;