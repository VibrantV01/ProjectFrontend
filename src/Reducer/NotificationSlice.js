import React from 'react';
import {createSlice} from '@reduxjs/toolkit'


const NotificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        Notifications: [],
    },
    reducers: {

       
        
        addNotifs: (state, action) => {
            console.log('lkac');
            console.log(action);
            state.Notifications = action.payload;
        },
        
    }
});


const { actions, reducer } = NotificationSlice;
export const { addNotifs } = actions;
export default reducer;