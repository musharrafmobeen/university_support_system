import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getAnnouncementsURL = configData.url.getAnnouncementsUrl;

const url = `${baseUrl}${getAnnouncementsURL}`;

const slice = createSlice({
    name: "announcments",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        announcementsRequested: (announcements, action) => {
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = true;
        },
        announcementsRecieved: (announcements, action) => {
            announcements.list = action.payload.announcements;
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = false;
        },
        announcemnetsRequestFailed: (announcements, action) => {
            announcements.isError = true;
            announcements.errorMessage = action.payload.message;
            announcements.loading = false;
        },
        announcementAdditionRequested: (announcements, action) => {
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = true;
        },
        announcementAdded: (announcements, action) => {
            announcements.list.push(action.payload.createdAnnouncement);
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = false;
        },
        announcementAdditionFailed: (announcements, action) => {
            announcements.isError = true;
            announcements.errorMessage = action.payload.message;
            announcements.loading = false;
        },
        announcementUpdationRequested: (announcements, action) => {
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = true;
        },
        announcmentUpdated: (announcements, action) => {
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = false;
        },
        announcementUpdationFailed: (announcements, action) => {
            announcements.isError = true;
            announcements.errorMessage = action.payload.message;
            announcements.loading = false;
        },
        announcementRemovalRequested: (announcements, action) => {
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = true;
        },
        announcementRemoved: (announcements, action) => {
            announcements.list = announcements.list.filter(announ => announ._id !== action.payload.announcement._id);
            announcements.isError = false;
            announcements.errorMessage = "";
            announcements.loading = false;
        },
        announcementRemovalFailed: (announcements, action) => {
            announcements.isError = true;
            announcements.errorMessage = action.payload.message;
            announcements.loading = false;
        },
    }
});

const {
    announcementsRequested,
    announcementsRecieved,
    announcemnetsRequestFailed,
    announcementAdditionRequested,
    announcementAdded,
    announcementAdditionFailed,
    announcementUpdationRequested,
    announcmentUpdated,
    announcementUpdationFailed,
    announcementRemovalRequested,
    announcementRemoved,
    announcementRemovalFailed
} = slice.actions;


export const loadAnnouncements = () => apiCallBegan({
    url,
    onStart: announcementsRequested.type,
    onSuccess: announcementsRecieved.type,
    onError: announcemnetsRequestFailed.type
});

export const addAnnouncement = (announcement) => apiCallBegan({
    url,
    method: "post",
    data: {
        ...announcement
    },
    onStart: announcementAdditionRequested.type,
    onSuccess: announcementAdded.type,
    onError: announcementAdditionFailed.type
});

export const updateAnnouncement = (announcementId, announcement) => apiCallBegan({
    url: `${url}/${announcementId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...announcement
    },
    onStart: announcementUpdationRequested.type,
    onSuccess: announcmentUpdated.type,
    onError: announcementUpdationFailed.type
});

export const deleteAnnouncement = announcementId => apiCallBegan({
    url: `${url}/${announcementId}`,
    method: "delete",
    data: {
        "deleteBy": "_id",
    },
    onStart: announcementRemovalRequested.type,
    onSuccess: announcementRemoved.type,
    onError: announcementRemovalFailed.type
});

export default slice.reducer;