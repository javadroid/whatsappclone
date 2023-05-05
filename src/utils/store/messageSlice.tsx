import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messagesData: {},
       
    }, reducers: {
        setMessages: (state, action) => {
            const existingMessages = state.messagesData as any
            const { chatId,messageData } = action.payload
            existingMessages[chatId]=messageData
            state.messagesData = existingMessages
            

        },
    }
})


export const setMessages = messageSlice.actions.setMessages


export default messageSlice.reducer