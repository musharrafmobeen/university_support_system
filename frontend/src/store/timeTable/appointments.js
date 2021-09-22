import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getTimeTableurl = configData.url.getTimeTableURL;
const url = `${baseUrl}${getTimeTableurl}`;

const slice = createSlice({
    name: "appointments",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        appointmentsRequested: (appointments, action) => {
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = true;
        },
        appointmentsRecieved: (appointments, action) => {
            appointments.list = action.payload.timetables;
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = false;
        },
        appointmentsRequestFailed: (appointments, action) => {
            appointments.isError = true;
            appointments.errorMessage = action.payload.message;
            appointments.loading = false;
        },
        appointmentAdditionRequested: (appointments, action) => {
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = true;
        },
        appointmentAdded: (appointments, action) => {
            appointments.list.push(action.payload.createdTimeTable);
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = false;
        },
        appointmentAdditionFailed: (appointments, action) => {
            appointments.isError = true;
            appointments.errorMessage = action.payload.message;
            appointments.loading = false;
        },
        appointmentUpdationRequested: (appointments, action) => {
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = true;
        },
        appointmentUpdated: (appointments, action) => {
            const index = appointments.list.findIndex(appoint => appoint._id === action.payload.updated_timeTable._id);
            appointments.list[index] = action.payload.updated_timeTable;
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = false;
        },
        appointmentUpdationFailed: (appointments, action) => {
            appointments.isError = true;
            appointments.errorMessage = action.payload.message;
            appointments.loading = false;
        },
        appointmentRemovalRequested: (appointments, action) => {
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = true;
        },
        appointmentRemoved: (appointments, action) => {
            appointments.list = appointments.list.filter(appoint => appoint.id !== action.payload.timetable._id);
            appointments.isError = false;
            appointments.errorMessage = "";
            appointments.loading = false;
        },
        appointmentRemovalFailed: (appointments, action) => {
            appointments.isError = true;
            appointments.errorMessage = action.payload.message;
            appointments.loading = false;
        },
    }
});

const {
    appointmentsRequested,
    appointmentsRecieved,
    appointmentsRequestFailed,
    appointmentAdditionRequested,
    appointmentAdded,
    appointmentAdditionFailed,
    appointmentUpdationRequested,
    appointmentUpdated,
    appointmentUpdationFailed,
    appointmentRemovalRequested,
    appointmentRemoved,
    appointmentRemovalFailed
} = slice.actions;

export const loadTimeTable = () => apiCallBegan({
    url,
    onStart: appointmentsRequested.type,
    onSuccess: appointmentsRecieved.type,
    onError: appointmentsRequestFailed.type
});

export const addTimeTable = timeTable => apiCallBegan({
    url,
    method: "post",
    data: {
        ...timeTable
    },
    onStart: appointmentAdditionRequested.type,
    onSuccess: appointmentAdded.type,
    onError: appointmentAdditionFailed.type
});

export const updateTimeTable = (timeTableId, timeTable) => apiCallBegan({
    url: `${url}/${timeTableId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...timeTable
    },
    onStart: appointmentUpdationRequested.type,
    onSuccess: appointmentUpdated.type,
    onError: appointmentUpdationFailed.type
});

export const deleteTimeTable = (timeTableId) => apiCallBegan({
    url: `${url}${timeTableId}`,
    method: "delete",
    data: {
        "deleteBy": "_id"
    },
    onStart: appointmentRemovalRequested.type,
    onSuccess: appointmentRemoved.type,
    onError: appointmentRemovalFailed.type
});


export default slice.reducer;

