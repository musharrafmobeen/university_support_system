import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getAppointRequestUrl = configData.url.getAppointmentsRequestsURL;
const url = `${baseUrl}${getAppointRequestUrl}`;


const slice = createSlice({
    name: "appointmentsRequests",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        requestsRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        requestsRecieved: (requests, action) => {
            requests.list = action.payload.appointsments;
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        requestsFetchFailed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
        requestAdditionRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        requestAdded: (requests, action) => {
            requests.list.push(action.payload.createdAppointment);
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        requestAdditionFialed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
        requestUpdationRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        requestUpdated: (requests, action) => {
            const index = requests.list.findIndex(req => req._id === action.payload.updated_appointment._id);
            requests.list[index] = action.payload.updated_appointment;
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        requestUpdationFialed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
        requestRemovalRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        requestRemoved: (requests, action) => {
            requests.list = requests.list.filter(req => req._id !== action.payload.appointment._id);
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        requestRemovalFailed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
    }
});

const {
    requestsRequested,
    requestsRecieved,
    requestsFetchFailed,
    requestAdditionRequested,
    requestAdded,
    requestAdditionFialed,
    requestUpdationRequested,
    requestUpdated,
    requestUpdationFialed,
    requestRemovalRequested,
    requestRemoved,
    requestRemovalFailed
} = slice.actions;


export const loadAppointmentsRequests = () => apiCallBegan({
    url,
    onStart: requestsRequested.type,
    onSuccess: requestsRecieved.type,
    onError: requestsFetchFailed.type
});

export const addAppointmentRequest = request => apiCallBegan({
    url,
    method: "post",
    data: {
        ...request
    },
    onStart: requestAdditionRequested.type,
    onSuccess: requestAdded.type,
    onError: requestAdditionFialed.type
});

export const updateAppointmentRequest = (requestId, reqData) => apiCallBegan({
    url: `${url}/${requestId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        "isGranted": "true",
        ...reqData
    },
    onStart: requestUpdationRequested.type,
    onSuccess: requestUpdated.type,
    onError: requestUpdationFialed.type
});

export const deleteAppointmentRequest = reqId => apiCallBegan({
    url: `${url}/${reqId}`,
    method: "delete",
    data: {
        "deleteBy": "_id"
    },
    onStart: requestRemovalRequested.type,
    onSuccess: requestRemoved.type,
    onError: requestRemovalFailed.type
});



export default slice.reducer;