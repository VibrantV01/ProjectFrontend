import React from 'react';
import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        users: [],
        currentpage: 1,
        lastpage: 1,
    },
    reducers: {
        currentpage: (state, action) => {
            state.currentpage = action.payload;
        },
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state, action) => {
            state.currentUser = null;
        },
        showUsers: (state, action) => {
            state.users = action.payload
        },
        removeUsers: (state, action) => {
            state.users = []
        },
        setUsers: (state, action)=>{
            state.users = action.payload;
        },
        lastpage: (state, action) => {
            state.lastpage = action.payload;
        }
    }
});


const { actions, reducer } = userSlice
export const {login, logout, showUsers, removeUsers, setUsers, currentpage, lastpage} = actions;
export default reducer;