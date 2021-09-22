import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';


const baseUrl = configData.url.baseUrl;
const getDocRequestUrl = configData.url.getDocumentRequestsURL;
const url = `${baseUrl}${getDocRequestUrl}`;


const slice = createSlice({
    name: "documentsRequests",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        docRequestsRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        docRequestsReceived: (requests, action) => {
            requests.list = action.payload.documentRequests;
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        docRequestsFetchFailed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
        docRequestAdditionRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        docRequestAdded: (requests, action) => {
            requests.list.push(action.payload.createdDocuementRequest);
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        docRequestAdditionFailed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
        docRequestUpdationRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        docRequestUpdated: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        docRequestUpdationFailed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
        docRequestRemovalRequested: (requests, action) => {
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = true;
        },
        docRequestRemoved: (requests, action) => {
            requests.list = requests.list.filter(req => req._id !== action.payload.documentRequest._id);
            requests.isError = false;
            requests.errorMessage = "";
            requests.loading = false;
        },
        docRequestRemovalFailed: (requests, action) => {
            requests.isError = true;
            requests.errorMessage = action.payload.message;
            requests.loading = false;
        },
    }
});


const {
    docRequestsRequested,
    docRequestsReceived,
    docRequestsFetchFailed,
    docRequestAdditionRequested,
    docRequestAdded,
    docRequestAdditionFailed,
    docRequestUpdationRequested,
    docRequestUpdated,
    docRequestUpdationFailed,
    docRequestRemovalRequested,
    docRequestRemoved,
    docRequestRemovalFailed
} = slice.actions;


export const loadDocumentsRequests = () => apiCallBegan({
    url,
    onStart: docRequestsRequested.type,
    onSuccess: docRequestsReceived.type,
    onError: docRequestsFetchFailed.type
});

export const addDocumentRequest = docRequest => apiCallBegan({
    url,
    method: "post",
    data: {
        ...docRequest
    },
    onStart: docRequestAdditionRequested.type,
    onSuccess: docRequestAdded.type,
    onError: docRequestAdditionFailed.type
});

export const updateDocumentRequest = (docReqId, docReq) => apiCallBegan({
    url: `${url}/${docReqId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...docReq
    },
    onStart: docRequestUpdationRequested.type,
    onSuccess: docRequestUpdated.type,
    onError: docRequestUpdationFailed.type
});

export const deleteDocumentRequest = docReqId => apiCallBegan({
    url: `${url}/${docReqId}`,
    method: "delete",
    data: {
        "deleteBy": "_id"
    },
    onStart: docRequestRemovalRequested.type,
    onSuccess: docRequestRemoved.type,
    onError: docRequestRemovalFailed.type
});

export default slice.reducer;