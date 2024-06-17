import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import postReducer from "./slices/postSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        post:postReducer
    },
});

export default store;
