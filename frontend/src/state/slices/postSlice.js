import { createSlice } from "@reduxjs/toolkit";
import { fetchFeeds, fetchPosts } from "../actions/postActions.js";


const postSlice = createSlice({
    name: "post",
    initialState: {
        userPosts: [],
        feedPosts: [],
        postLoading: false,
        postError: null, 
        feedLoading: false,
        feedError: null,
    },
    reducers: {
       addPost:(state, action)=>{
         state.userPosts=[action.payload, ...state.userPosts];
         console.log(action.payload);
       },
       setReplyandLikes:(state, action)=>{
          state.userPosts=[...action.payload];
       },
       deletePost:(state, action)=>{
        console.log(state.userPosts);
        state.userPosts=state.userPosts.filter((post)=>post._id!==action.payload);
        console.log(state.userPosts);
       }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.postLoading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.postLoading = false;
            state.userPosts=action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
             state.postLoading = false;
             state.postError=action.payload
        }),
        builder.addCase(fetchFeeds.pending, (state, action) => {
            state.feedLoading = true;
        })
        .addCase(fetchFeeds.fulfilled, (state, action) => {
            state.feedLoading = false;
            state.feedPosts=action.payload;
        })
        .addCase(fetchFeeds.rejected, (state, action) => {
             state.feedLoading = false;
             state.feedError=action.payload
        })
    }
})

export const { addPost, setReplyandLikes, deletePost } = postSlice.actions;
export default postSlice.reducer;
