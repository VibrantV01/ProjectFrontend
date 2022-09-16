import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from './Reducer/userSlice';
import taskReducer from './Reducer/taskSlice';
import NotificationReducer from './Reducer/NotificationSlice'
import thunk from 'redux-thunk';


const store = configureStore({
    reducer: {
        users: userReducer,
        tasks: taskReducer,
        notifications: NotificationReducer,
    }
})


export default store;