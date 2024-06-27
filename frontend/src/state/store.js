import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import postReducer from "./slices/postSlice.js";
import messageReducer from "./slices/messageSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        post:postReducer,
        message: messageReducer
    },
});

export default store;
