import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getStudents = configData.url.getStudentsUrl;
const getUnApprovedStudents = configData.url.getUnApprovedStudents;
const getRejectedStudents = configData.url.getRejectedStudents;

const url = `${baseUrl}${getStudents}`


const slice = createSlice({
    name: "students",
    initialState: {
        list: [],
        unApprovedStudents: [],
        rejectedStudents: [],
        loading: false,
        isError: false,
        errorMessage: "",
    },
    reducers: {
        studentsRequested: (students, action) => {
            students.isError = false;
            students.errorMessage = "";
            students.loading = true;
        },
        studentsRecieved: (students, action) => {
            students.list = action.payload.students;
            students.isError = false;
            students.errorMessage = "";
            students.loading = false;
        },
        studentsRequestFailed: (students, action) => {
            students.isError = true;
            students.errorMessage = action.payload.message;
            students.loading = false;
        },
        unApprovedStudentsRequested: (students, action) => {
            students.isError = false;
            students.errorMessage = "";
            students.loading = true;
        },
        unApprovedStudentsRecieved: (students, action) => {
            students.unApprovedStudents = action.payload.students;
            students.isError = false;
            students.errorMessage = "";
            students.loading = false;
        },
        unApprovedStudentsRequestFailed: (students, action) => {
            students.isError = true;
            students.errorMessage = action.payload.message;
            students.loading = false;
        },
        rejectedStudentsRequested: (students, action) => {
            students.isError = false;
            students.errorMessage = "";
            students.loading = true;
        },
        rejectedStudentsRecieved: (students, action) => {
            students.rejectedStudents = action.payload.students;
            students.isError = false;
            students.errorMessage = "";
            students.loading = false;
        },
        rejectedStudentsRequestFailed: (students, action) => {
            students.isError = true;
            students.errorMessage = action.payload.message;
            students.loading = false;
        },
        studentUpdationRequested: (students, action) => {
            students.isError = false;
            students.errorMessage = "";
            students.loading = true;
        },
        studentUpdated: (students, action) => {
            const index = students.list.findIndex(student => student._id === action.payload.updatedStudent[0]._id);
            students.list[index] = action.payload.updatedStudent[0];
            students.isError = false;
            students.errorMessage = "";
            students.loading = false;
        },
        studentUpdationFailed: (students, action) => {
            students.isError = true;
            students.errorMessage = action.payload.message;
            students.loading = false;
        },
        studentAdditionRequested: (students, action) => {
            students.isError = false;
            students.errorMessage = "";
            students.loading = true;
        },
        studentAdded: (students, action) => {
            students.list.push(action.payload.createdProduct);
            students.isError = false;
            students.errorMessage = "";
            students.loading = false;
        },
        studentAdditionFailed: (students, action) => {
            students.isError = true;
            students.errorMessage = action.payload.message;
            students.loading = false;
        },
        studentRemovalRequested: (students, action) => {
            students.isError = false;
            students.errorMessage = "";
            students.loading = true;
        },
        studentRemoved: (students, action) => {
            students.list = students.list.filter(student => student._id !== action.payload.student._id);
            students.isError = false;
            students.errorMessage = "";
            students.loading = false;
        },
        studentRemovalFailed: (students, action) => {
            students.isError = true;
            students.errorMessage = action.payload.message;
            students.loading = false;
        },
    },
});

const {
    studentsRequested,
    studentsRecieved,
    studentsRequestFailed,
    unApprovedStudentsRequested,
    unApprovedStudentsRecieved,
    unApprovedStudentsRequestFailed,
    rejectedStudentsRequested,
    rejectedStudentsRecieved,
    rejectedStudentsRequestFailed,
    studentUpdationRequested,
    studentUpdated,
    studentUpdationFailed,
    studentAdditionRequested,
    studentAdded,
    studentAdditionFailed,
    studentRemovalRequested,
    studentRemoved,
    studentRemovalFailed
} = slice.actions;


export const loadStudents = () => apiCallBegan({
    url,
    onStart: studentsRequested.type,
    onSuccess: studentsRecieved.type,
    onError: studentsRequestFailed.type,
});

export const loadUnApprovedStudents = () => apiCallBegan({
    url: `${url}${getUnApprovedStudents}`,
    onStart: unApprovedStudentsRequested.type,
    onSuccess: unApprovedStudentsRecieved.type,
    onError: unApprovedStudentsRequestFailed.type,
});

export const loadRejectedStudents = () => apiCallBegan({
    url: `${url}${getRejectedStudents}`,
    onStart: rejectedStudentsRequested.type,
    onSuccess: rejectedStudentsRecieved.type,
    onError: rejectedStudentsRequestFailed.type,
});

export const updateStudent = (studentId, formData) => apiCallBegan({
    url: `${url}/${studentId}`,
    method: "patch",
    data: {
        "updateBy": "_id",
        ...formData
    },
    // headers: { 'Content-Type': 'multipart/form-data' },
    onStart: studentUpdationRequested.type,
    onSuccess: studentUpdated.type,
    onError: studentUpdationFailed.type,

});

export const deleteStudent = studentId => apiCallBegan({
    url: `${url}/${studentId}`,
    method: "delete",
    data: {
        "deleteBy": "_id",
    },
    onStart: studentRemovalRequested.type,
    onSuccess: studentRemoved.type,
    onError: studentRemovalFailed.type
});

export const addStudent = student => apiCallBegan({
    url,
    method: "post",
    data: {
        ...student
    },
    onStart: studentAdditionRequested.type,
    onSuccess: studentAdded.type,
    onError: studentAdditionFailed.type
});

export default slice.reducer;