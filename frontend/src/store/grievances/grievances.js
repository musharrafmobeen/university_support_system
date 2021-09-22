import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getGrievances = configData.url.getGrievancesUrl;
const url = `${baseUrl}${getGrievances}`

const slice = createSlice({
    name: "grievances",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        grievancesRequested: (grievances, action) => {
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = true;
        },
        grievancesRecieved: (grievances, action) => {
            grievances.list = action.payload.grievances;
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = false;
        },
        grievancesRequestFailed: (grievances, action) => {
            grievances.isError = true;
            grievances.errorMessage = action.payload.message;
            grievances.loading = false;
        },
        grievanceAdditionRequested: (grievances, action) => {
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = true;
        },
        grievanceAdded: (grievances, action) => {
            grievances.list.push(action.payload.grievance);
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = false;
        },
        grievanceAdditionFialed: (grievances, action) => {
            grievances.isError = true;
            grievances.errorMessage = action.payload.message;
            grievances.loading = false;
        },
        grievanceUpdationRequested: (grievances, action) => {
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = true;
        },
        grievanceUpdated: (grievances, action) => {
            const index = grievances.list.findIndex(grievance => grievance._id === action.payload.updatedGrievance[0]._id);
            grievances.list[index] = action.payload.updatedGrievance[0];
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = false;
        },
        grievanceUpdationFialed: (grievances, action) => {
            grievances.isError = true;
            grievances.errorMessage = action.payload.message;
            grievances.loading = false;
        },
        greivanceRemovalRequested: (grievances, action) => {
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = true;
        },
        grievanceRemoved: (grievances, action) => {
            grievances.isError = false;
            grievances.errorMessage = "";
            grievances.loading = false;
        },
        grievanceRemovalFailed: (grievances, action) => {
            grievances.isError = true;
            grievances.errorMessage = action.payload.message;
            grievances.loading = false;
        },

    }
});

const {
    grievancesRequested,
    grievancesRecieved,
    grievancesRequestFailed,
    grievanceAdditionRequested,
    grievanceAdded,
    grievanceAdditionFialed,
    grievanceUpdationRequested,
    grievanceUpdated,
    grievanceUpdationFialed,
    greivanceRemovalRequested,
    grievanceRemoved,
    grievanceRemovalFailed

} = slice.actions;

export const loadGrievances = () => apiCallBegan({
    url,
    onStart: grievancesRequested.type,
    onSuccess: grievancesRecieved.type,
    onError: grievancesRequestFailed.type
});

export const updateGrievance = (grievanceId, grievance) => apiCallBegan({
    url: `${url}/${grievanceId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...grievance
    },
    onStart: grievanceUpdationRequested.type,
    onSuccess: grievanceUpdated.type,
    onError: grievanceUpdationFialed.type
});

export const addGrievance = grievance => apiCallBegan({
    url,
    method: "post",
    data: {
        ...grievance
    },
    onStart: grievanceAdditionRequested.type,
    onSuccess: grievanceAdded.type,
    onError: grievanceAdditionFialed.type
});

export default slice.reducer;