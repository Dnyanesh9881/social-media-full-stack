import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchConversations = createAsyncThunk("message/fetchConversations", async (_, thunkAPI) => {
    try {
        const res = await fetch("/api/conversations");
        const data = await res.json();
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);

        }
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export {fetchConversations};

