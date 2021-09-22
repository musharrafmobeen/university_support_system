import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from '../api';
import configData from "../../config.json";

const baseUrl = configData.url.baseUrl;
const getEmployeesUrl = configData.url.getEmployeesUrl;
const getUnApprovedEmployeesUrl = configData.url.getUnApprovedEmployeesUrl;
const getRejectedEmployeesUrl = configData.url.getRejectedEmployeesUrl;

const url = `${baseUrl}${getEmployeesUrl}`;

const slice = createSlice({
    name: "employees",
    initialState: {
        list: [],
        unApprovedEmployees: [],
        rejectedEmployees: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        employeesRequested: (employees, action) => {
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = true;
        },
        employeesRecieved: (employees, action) => {
            employees.list = action.payload.employees;
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = false;
        },
        employeesRequestFialed: (employees, action) => {
            employees.isError = true;
            employees.errorMessage = action.payload.message;
            employees.loading = false;
        },
        unApprovedEmployeesRequested: (employees, action) => {
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = true;
        },
        unApprovedEmployeesRecieved: (employees, action) => {
            employees.unApprovedEmployees = action.payload.employees;
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = false;
        },
        unApprovedEmployeesRequestFailed: (employees, action) => {
            employees.isError = true;
            employees.errorMessage = action.payload.message;
            employees.loading = false;
        },
        rejectedEmployeesRequested: (employees, action) => {
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = true;
        },
        rejectedEmployeesRecieved: (employees, action) => {
            employees.rejectedEmployees = action.payload.employees;
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = false;
        },
        rejectEmployeesRequestFailed: (employees, action) => {
            employees.isError = true;
            employees.errorMessage = action.payload.message;
            employees.loading = false;
        },
        employeeAdditionRequested: (employees, action) => {
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = true;
        },
        employeeAdded: (employees, action) => {
            employees.list.push(action.payload.employee);
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = false;
        },
        employeeAdditionFailed: (employees, action) => {
            employees.isError = true;
            employees.errorMessage = action.payload.message;
            employees.loading = false;
        },
        employeeUpdationRequested: (employees, action) => {
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = true;
        },
        employeeUpdated: (employees, action) => {
            const index = employees.list.findIndex(employee => employee._id === action.payload.updatedEmployee[0]._id);
            employees.list[index] = action.payload.updatedEmployee[0];
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = false;
        },
        employeeUpdationFailed: (employees, action) => {
            employees.isError = true;
            employees.errorMessage = action.payload.message;
            employees.loading = false;
        },
        employeeRemovalRequested: (employees, action) => {
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = true;
        },
        employeeRemoved: (employees, action) => {
            employees.list = employees.list.filter(employee => employee._id !== action.payload.employee._id);
            employees.isError = false;
            employees.errorMessage = "";
            employees.loading = false;
        },
        employeeRemovalFialed: (employees, action) => {
            employees.isError = true;
            employees.errorMessage = action.payload.message;
            employees.loading = false;
        },
    }
});


const {
    employeesRequested,
    employeesRecieved,
    employeesRequestFialed,
    unApprovedEmployeesRequested,
    unApprovedEmployeesRecieved,
    unApprovedEmployeesRequestFailed,
    rejectedEmployeesRequested,
    rejectedEmployeesRecieved,
    rejectEmployeesRequestFailed,
    employeeAdditionRequested,
    employeeAdded,
    employeeAdditionFailed,
    employeeUpdationRequested,
    employeeUpdated,
    employeeUpdationFailed,
    employeeRemovalRequested,
    employeeRemoved,
    employeeRemovalFialed
} = slice.actions;


export const loadEmployees = () => apiCallBegan({
    url,
    onStart: employeesRequested.type,
    onSuccess: employeesRecieved.type,
    onError: employeesRequestFialed.type,
});

export const loadUnApprovedEmployees = () => apiCallBegan({
    url: `${url}${getUnApprovedEmployeesUrl}`,
    onStart: unApprovedEmployeesRequested.type,
    onSuccess: unApprovedEmployeesRecieved.type,
    onError: unApprovedEmployeesRequestFailed.type
});

export const loadRejectedEmployees = () => apiCallBegan({
    url: `${url}${getRejectedEmployeesUrl}`,
    onSart: rejectedEmployeesRequested.type,
    onSuccess: rejectedEmployeesRecieved.type,
    onError: rejectEmployeesRequestFailed.type
});

export const addEmployee = (employee, imgData) => apiCallBegan({
    url,
    method: "post",
    // headers: {
    //     'Content-Type': `multipart/form-data; boundary=${imgData._boundary}`
    // },
    data: {
        ...employee,
        // imgData
    },
    onStart: employeeAdditionRequested.type,
    onSuccess: employeeAdded.type,
    onError: employeeAdditionFailed.type
});

export const updateEmployee = (employeeId, formData) => apiCallBegan({
    url: `${url}/${employeeId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...formData
    },
    onStart: employeeUpdationRequested.type,
    onSuccess: employeeUpdated.type,
    onError: employeeUpdationFailed.type
});

export const deleteEmployee = employeeId => apiCallBegan({
    url: `${url}/${employeeId}`,
    method: "delete",
    data: {
        "deleteBy": "_id",
    },
    onStart: employeeRemovalRequested.type,
    onSccess: employeeRemoved.type,
    onError: employeeRemovalFialed.type,
});

export default slice.reducer;