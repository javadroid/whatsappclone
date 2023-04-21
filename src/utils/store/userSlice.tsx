import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        storedUserData: {},
        userToChatWith: null,
    }, reducers: {
        setStoreUsers: (state, action) => {
            const { payload } = action
            const newUser= payload.newData
            const existingUser=state.storedUserData as any
            const userArray=Object.values(newUser)
            for (let i = 0; i < userArray.length; i++) {
                const userData = userArray[i] as any;
                existingUser[userData.userId] = userData
                
            }
            state.storedUserData = existingUser

        },
        setuserToChatWith:(state, action) => {
            const { payload } = action
            state.userToChatWith = payload.newUser
        },
    }
})


export const setStoreUsers = userSlice.actions.setStoreUsers
export const setuserToChatWith = userSlice.actions.setuserToChatWith


export default userSlice.reducer