import React from 'react';
import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        users: []
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state, action) => {
            state.currentUser = null
        },
        showUsers: (state, action) => {
            state.users = action.payload
        },
        removeUsers: (state, action) => {
            state.users = []
        }
    }
});


const { actions, reducer } = userSlice
export const {login, logout, showUsers, removeUsers} = actions;
export default reducer;