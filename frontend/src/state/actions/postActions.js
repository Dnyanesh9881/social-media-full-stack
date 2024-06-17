import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchPosts = createAsyncThunk("post/fetchPosts", async (username, thunkAPI) => {
    try {
        const res = await fetch(`/api/post/user/${username}`);
        const data = await res.json();
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }
        return thunkAPI.fulfillWithValue(data)
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.message);
    }
})

const fetchFeeds = createAsyncThunk("post/fetchFeeds", async (_, thunkAPI) => {
    try {
        const res = await fetch(`/api/post/feed`);
        const data = await res.json();
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }
        return thunkAPI.fulfillWithValue(data)
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.message);
    }
})

export { fetchPosts, fetchFeeds };