import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userData: null,
        didTryAutoLogin: false,
        
    }, reducers: {
        authentication: (state, action) => {
            const { payload } = action
            state.token = payload.token
            state.userData = payload.userData
        },
        setDitTryAutoLogin: (state, action) => {
            state.didTryAutoLogin = true
        },
        logout:(state)=>{
            state.token= null,
            state.userData= null,
            state.didTryAutoLogin= false
        },
        updateLoggedInUser: (state, action) => {
            state.userData = {...state.userData,...action.payload.newData}
        },
       
    }
})

export const setDitTryAutoLogin = authSlice.actions.setDitTryAutoLogin
export const authenticate = authSlice.actions.authentication
export const updateLoggedInUser = authSlice.actions.updateLoggedInUser
export const Authlogout = authSlice.actions.logout

export default authSlice.reducer