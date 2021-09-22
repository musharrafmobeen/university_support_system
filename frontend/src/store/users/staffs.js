import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getStaffUrl = configData.url.getStaffURL;
const url = `${baseUrl}${getStaffUrl}`;


const slice = createSlice({
    name: "staff",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        staffsRequested: (staffs, action) => {
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = true;
        },
        staffsRecieved: (staffs, action) => {
            staffs.list = action.payload.staffs;
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = false;
        },
        staffsRequestFailed: (staffs, action) => {
            staffs.isError = true;
            staffs.errorMessage = action.payload.message;
            staffs.loading = false;
        },
        staffAdditionRequested: (staffs, action) => {
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = true;
        },
        staffAdded: (staffs, action) => {
            staffs.list.push(action.payload.createdStaff);
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = false;
        },
        staffAdditionFailed: (staffs, action) => {
            staffs.isError = true;
            staffs.errorMessage = action.payload.message;
            staffs.loading = false;
        },
        staffUpdationRequested: (staffs, action) => {
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = true;
        },
        staffUpdated: (staffs, action) => {
            const index = staffs.list.findIndex(user => user._id === action.payload.updatedStaff._id);
            staffs.list[index] = action.payload.updatedStaff;
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = false;
        },
        staffUpdationFailed: (staffs, action) => {
            staffs.isError = true;
            staffs.errorMessage = action.payload.message;
            staffs.loading = false;
        },
        staffRemovalRequested: (staffs, action) => {
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = true;
        },
        staffRemoved: (staffs, action) => {
            staffs.list = staffs.list.filter(staff => staff._id !== action.payload.staff);
            staffs.isError = false;
            staffs.errorMessage = "";
            staffs.loading = false;
        },
        staffRemovalFailed: (staffs, action) => {
            staffs.isError = true;
            staffs.errorMessage = action.payload.message;
            staffs.loading = false;
        },
    }
});

const {
    staffsRequested,
    staffsRecieved,
    staffsRequestFailed,
    staffAdditionRequested,
    staffAdded,
    staffAdditionFailed,
    staffUpdationRequested,
    staffUpdated,
    staffUpdationFailed,
    staffRemovalRequested,
    staffRemoved,
    staffRemovalFailed
} = slice.actions;

export const loadStaffs = () => apiCallBegan({
    url,
    onStart: staffsRequested.type,
    onSuccess: staffsRecieved.type,
    onError: staffsRequestFailed.type
});

export const addStaff = (staff) => apiCallBegan({
    url,
    method: "post",
    data: {
        ...staff
    },
    onStart: staffAdditionRequested.type,
    onSuccess: staffAdded.type,
    onError: staffAdditionFailed.type
});

export const deleteStaff = (staffId) => apiCallBegan({
    url: `${url}/${staffId}`,
    method: "delete",
    data: {
        "deleteBy": "_id"
    },
    onStart: staffRemovalRequested.type,
    onSuccess: staffRemoved.type,
    onError: staffRemovalFailed.type
});

export const updateStaff = (staffId, staff) => apiCallBegan({
    url: `${url}/${staffId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...staff
    },
    onStart: staffUpdationRequested.type,
    onSuccess: staffUpdated.type,
    onError: staffUpdationFailed.type
});

export default slice.reducer;