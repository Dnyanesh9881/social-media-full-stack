import { createSlice } from "@reduxjs/toolkit";
import { fetchConversations } from "../actions/messageActions";


const messageSlice = createSlice({
    name: "message",
    initialState: {
        conversations: [],
        selectedConversation: null,
      
        loadingConversations: false,
    },
    reducers: {
        setSelectedConversation: (state, action) => {
           state.selectedConversation=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.pending, (state, actions) => {
            state.loadingConversations = true;
        }),
            builder.addCase(fetchConversations.fulfilled, (state, actions) => {
                state.loadingConversations = false;
                state.conversations = actions.payload;
            }),
            builder.addCase(fetchConversations.rejected, (state, actions) => {
                state.loadingConversations = false;
                state.loadingConversations = actions.payload;
            })
    }
})

export const { setSelectedConversation} = messageSlice.actions;
export default messageSlice.reducer