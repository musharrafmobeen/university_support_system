import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from '../../config.json';

const baseUrl = configData.url.baseUrl;
const getRatingsUrl = configData.url.getStaffRatingsUrl;
const url = `${baseUrl}${getRatingsUrl}`;

const slice = createSlice({
    name: "staffRatings",
    initialState: {
        list: [],
        loadig: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        ratingsRequested: (ratings, action) => {
            ratings.isError = false;
            ratings.errorMessage = "";
            ratings.loadig = true;
        },
        ratingsRecieved: (ratings, action) => {
            ratings.list = action.payload.ratings;
            ratings.isError = false;
            ratings.errorMessage = "";
            ratings.loadig = false;
        },
        ratingsRequestFailed: (ratings, action) => {
            ratings.isError = true;
            ratings.errorMessage = action.payload.message;
            ratings.loadig = false;
        },
        ratingAdditionRequested: (ratings, action) => {
            ratings.isError = false;
            ratings.errorMessage = "";
            ratings.loadig = true;
        },
        ratingAdded: (ratings, action) => {
            const index = ratings.list.findIndex(rating => rating._id === action.payload.createdRating._id);
            if (ratings.list[index]) { ratings.list[index] = action.payload.createdRating; }
            else { ratings.list.push(action.payload.createdRating); }
            ratings.isError = false;
            ratings.errorMessage = "";
            ratings.loadig = false;
        },
        ratingAdditionFailed: (ratings, action) => {
            ratings.isError = true;
            ratings.errorMessage = action.payload.message;
            ratings.loadig = false;
        },
    }
});


const {
    ratingsRequested,
    ratingsRecieved,
    ratingsRequestFailed,
    ratingAdditionRequested,
    ratingAdded,
    ratingAdditionFailed
} = slice.actions;

export const loadRatings = () => apiCallBegan({
    url,
    onStart: ratingsRequested.type,
    onSuccess: ratingsRecieved.type,
    onError: ratingsRequestFailed.type
});

export const addRating = rating => apiCallBegan({
    url,
    method: "post",
    data: {
        ...rating
    },
    onStart: ratingAdditionRequested.type,
    onSuccess: ratingAdded.type,
    onError: ratingAdditionFailed.type
});


export default slice.reducer;