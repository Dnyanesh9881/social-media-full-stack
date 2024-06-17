import { createAsyncThunk } from "@reduxjs/toolkit";



const fetchUser = createAsyncThunk("user/fetchUser", async(username, thunkAPI) => {
    try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
         }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
}
})

export { fetchUser }