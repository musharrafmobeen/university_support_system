import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getCetegories = configData.url.getCategoriesUrl;
const url = `${baseUrl}${getCetegories}`;


const slice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        loading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        categoriesRequested: (categories, action) => {
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = true;
        },
        categoriesRecieved: (categories, action) => {
            categories.list = action.payload.categories;
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = false;
        },
        categoriesRequestFailed: (categories, action) => {
            categories.isError = true;
            categories.errorMessage = action.payload.message;
            categories.loading = false;
        },
        categoryAdditionRequested: (categories, action) => {
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = true;
        },
        categoryAdded: (categories, action) => {
            categories.list.push(action.payload.createdCategory);
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = false;
        },
        categoryAdditionFailed: (categories, action) => {
            categories.isError = true;
            categories.errorMessage = action.payload.message;
            categories.loading = false;
        },
        categoryUpdationRequested: (categories, action) => {
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = true;
        },
        categoryUpdated: (categories, action) => {
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = false;
        },
        categoryUpdationFailed: (categories, action) => {
            categories.isError = true;
            categories.errorMessage = action.payload.message;
            categories.loading = false;
        },
        categoryRemovalRequested: (categories, action) => {
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = true;
        },
        categoryRemoved: (categories, action) => {
            categories.list = categories.list.filter(category => category._id !== action.payload.category);
            categories.isError = false;
            categories.errorMessage = "";
            categories.loading = false;
        },
        categoryRemovalFailed: (categories, action) => {
            categories.isError = true;
            categories.errorMessage = action.payload.message;
            categories.loading = false;
        },
    }
});

const {
    categoriesRequested,
    categoriesRecieved,
    categoriesRequestFailed,
    categoryAdditionRequested,
    categoryAdded,
    categoryAdditionFailed,
    categoryUpdationRequested,
    categoryUpdated,
    categoryUpdationFailed,
    categoryRemovalRequested,
    categoryRemoved,
    categoryRemovalFailed
} = slice.actions;

export const loadCategories = () => apiCallBegan({
    url,
    onStart: categoriesRequested.type,
    onSuccess: categoriesRecieved.type,
    onError: categoriesRequestFailed.type,
});

export const addCategory = (category) => apiCallBegan({
    url,
    method: "post",
    data: {
        ...category
    },
    onStart: categoryAdditionRequested.type,
    onSuccess: categoryAdded.type,
    onError: categoryAdditionFailed.type
});

export const deleteCategory = (categoryId) => apiCallBegan({
    url: `${url}/${categoryId}`,
    method: "delete",
    data: {
        "deleteBy": "_id"
    },
    onStart: categoryRemovalRequested.type,
    onSuccess: categoryRemoved.type,
    onError: categoryRemovalFailed.type
});

export default slice.reducer;