import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const ChatSlice = createSlice({
    name: 'chats',
    initialState: {
        chatsData: {},
       
    }, reducers: {
        setChatsData: (state, action) => {
            const { payload } = action
            state.chatsData = {...payload.chatsData}

        },
    }
})


export const setChatsData = ChatSlice.actions.setChatsData


export default ChatSlice.reducer