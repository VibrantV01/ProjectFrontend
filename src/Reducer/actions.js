import React from 'react';
import { showUsers } from './userSlice';
import Authservice from '../services/Authservice';
import {addTasks, removeTasks} from './taskSlice';
import {login, logout, removeUsers} from './userSlice';

//Action creator for registering
export const create = (data) => async (dispatch) => {
    try {
        const response = await Authservice.create(data);
        console.log(response);
        return response;
    } catch(error) {
        console.log(error);
    }
}

//Action creator for login
export const LogiN = (data) => async (dispatch) => {
    try {
        const response = await Authservice.Login(data);
        dispatch(login(response.data));
        return response.status;
    } catch(error) {
        console.log(error);
    }

}


//Action creator for logout
export const Logout = (token) => async(dispatch) => {
    try {
        const reseponse = await Authservice.Logout(token);
        dispatch(logout());
        dispatch(removeUsers());
    } catch (error) {
        console.log(error);
    }
}

//Action creator for showUser
export const showUser = (token) => async(dispatch) => {
    try {
        const response = await Authservice.showUser(token);
        dispatch(showUsers(response.data));
    } catch (error) {
        console.log(error);
    }
}


// //Action creator for addTasks
// export const addTask = () => async(dispatch) => {
//     try {
//         const response = await Authservice.addTask();
//         dispatch(addTasks(
//             {
//                 id : users.currentUser.user.id,
//                 tasks: response.data,
//             }
//         ));
//     } catch (error) {
//         console.log(error);

//     }
// } 


//Action creator for verifymail 
export const verifyemail = (config) => async(dispatch) => {
    try {
        const response = await Authservice.verifyemail(config);
    } catch (error) {
        console.log(error);
    }
}

//Action creator for password_reset
export const password_reset = (data) => async(dispatch) => {
    try {
        const response = await Authservice.password_reset(data);
    } catch (error) {
        console.log(error);
    }
}


//Action creator for password_resetmail
export const password_resetmail = (data) => async(dispatch) => {
    try {
        const response = await Authservice.password_resetmail(data);
    } catch (error) {
        console.log(error);
    }
}


//Action creator for create task
export const createTask = (data) => async(dispatch) => {
    try {
        const response = await Authservice.createtask(data);
        return response;
    } catch(error) {
        console.log(error);
    }
}


//Action creator for delete task 
export const deleteTask = (taskid, userID) => async(dispatch) => {
    try {
        const response = await Authservice.deletetask(taskid, userID);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const deleteUsers = (userID) => async(dispatch) => {
    try {
        const response = await Authservice.deleteuser(userID);
        return response;
    } catch(error) {
        console.log(error);
    }
}


//ACtion creator for edittask
export const edittask = (data, taskid) => async(dispatch) => {
    try {
        const response = await Authservice.edittask(data, taskid);
        return response;
    } catch (error) {
       console.log(error); 
    }
}

//Action creator for updatetask
export const updatetask = (taskid, data) => async(dispatch) => {
    try {
        const response = await Authservice.updatetask(taskid, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const updateuser = (data, userID) => async(dispatch) => {
    try {
        const response = await Authservice.updateuser(data, userID);
        return response;
    } catch (error) {
        console.group(error);
    }
}


export const createUser = (data) => async(dispatch) => {
    try {
        const response = await Authservice.createuser(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const showtask = (role, userID) => async(dispatch) => {
    try {
        const response = await Authservice.showtasks(role, userID);
        dispatch(addTasks(
            {
                id : userID,
                tasks: response.data,
            }
        ));
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const searchText = (input) => async(dispatch) => {
    try {
        const response = await Authservice.searchtext(input);
        dispatch(showUsers(response.data));
        return response;
    } catch(error) {
        console.log(error);
    }
}


export const searchTask = (role, userID, input) => async(dispatch) => {
    try {
        const response = await Authservice.searchtask(role, userID, input);
        dispatch(addTasks(
            {
                id : userID,
                tasks: response.data,
            }
        ));
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const filterRole = (role) => async(dispatch) => {
    try {
        const response = await Authservice.filterrole(role);
        dispatch(showUsers(response.data));
    } catch (error) {
        console.log(error);
    }
}



export const sorttask = (field, order, userID, role) => async(dispatch) => {
    try {
        const response = await Authservice.sorttask(field, order, userID, role);
        dispatch(addTasks(
            {
                id: userID,
                tasks: response.data,
            }
        ))
        return response;
    } catch (error) {
        console.log(error);
    }

}

export const filterTask = (field, value, userID, role) => async(dispatch) => {
    try {
        const response = await Authservice.filtertask(field, value, userID, role);
        dispatch(addTasks(
            {
                id: userID,
                tasks: response.data,
            }
        ))
        return response;
    } catch (error) {
        console.log(error);
    }
}

