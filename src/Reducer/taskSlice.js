import React from 'react';
import {createSlice} from '@reduxjs/toolkit'


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        Tasks: [],
       completedby: 0,
       inprogressby: 0,
       assignedby: 0,
       completedto: 0,
       assignedto: 0,
       inprogressto: 0,
       currentPage: 1,
       lastPage: 1,
    },
    reducers: {

       
        
        addTasks: (state, action) => {
            

            state.Tasks = action.payload.tasks;

            // let id = action.payload.id;
            // state.completedby = 0;
            // state.inprogressby = 0;
            // state.assignedby = 0;
            // state.completedto = 0;
            // state.assignedto = 0;
            // state.inprogressto = 0;
            // state.Tasks.map((task) => 
            //      {
            //          if (task.assigned_by == id && task.status == 'assigned') {
            //              state.assignedby = state.assignedby + 1;
            //          } 
            //          if (task.assigned_by == id && task.status == 'in-progress') {
            //              state.inprogressby = state.inprogressby + 1;
            //          } 
            //          if (task.assigned_by == id && task.status == 'completed') {
            //              state.completedby = state.completedby + 1;
            //          } 
            //          if (task.asigned_to == id && task.status == 'assigned') {
            //             state.assignedto = state.assignedto + 1;
            //         } 
            //         if (task.asigned_to == id && task.status == 'in-progress') {
            //             state.inprogressto = state.inprogressto + 1;
            //         } 
            //         if (task.asigned_to == id && task.status == 'completed') {
            //             state.completedto = state.completedto + 1;
            //         } 

            //      }
            //  )
        },
        removeTasks: (state, action) => {
            state.Tasks = []
        },
        setlastPage: (state, action) => {
            state.lastPage = action.payload;
        },
        setcurrentPage: (state, action) => {
            console.log(state.currentPage);
            state.currentPage = action.payload;
        },
        setStats: (state, action) => {
            state.completedby = action.payload['completedby'];
            state.assignedby = action.payload['assignedby'];
            state.inprogressby = action.payload['in-progressby'];
            state.completedto = action.payload['completedto'];
            state.assignedto = action.payload['assignedto'];
            state.inprogressto = action.payload['in-progressto'];
        }
    }
});


const { actions, reducer } = taskSlice
export const {addTasks, removeTasks, setcurrentPage, setStats, setlastPage} = actions;
export default reducer;