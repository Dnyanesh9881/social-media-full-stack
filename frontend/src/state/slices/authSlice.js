import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/userActions";


const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    currentUser: JSON.parse(localStorage.getItem("User")),
    useLoading: false,
    userError: null,
    authState:"login"
  },
  reducers: {
    setAuthState:(state, action)=>{
        state.authState=action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    userLogout: (state, action) => {
      localStorage.removeItem("User");
      state.currentUser = null;
    },
    followUnfollowUser: (state, action) => {
      state.currentUser.following.includes(action.payload) ? state.currentUser.following.push(action.payload) : state.currentUser.following.filter((id) => action.payload !== id)
      localStorage.setItem("User", JSON.stringify(state.currentUser));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.useLoading = true;
    })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.useLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.useLoading = false;
        state.userError = action.payload;
      })
  }
})

export const { setCurrentUser, userLogout, followUnfollowUser, setAuthState } = authSlice.actions;
export default authSlice.reducer;
