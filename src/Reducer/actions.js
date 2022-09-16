import React from 'react';
import { showUsers, currentpage, lastpage } from './userSlice';
import Authservice from '../services/Authservice';
import {addTasks, removeTasks, setcurrentPage, setStats, setlastPage} from './taskSlice';
import {login, logout, removeUsers} from './userSlice';
import { addNotifs } from './NotificationSlice';

//Action creator for registering
export const create = (data, token) => async (dispatch) => {
    try {
        const response = await Authservice.create(data, token);
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
export const showUser = (token, page) => async(dispatch) => {
    try {
        const response = await Authservice.showUser(token, page);
        console.log(response.data);
        dispatch(showUsers(response.data.data));
        dispatch(currentpage(response.data.current_page));
        dispatch(lastpage(response.data.last_page));
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

export const deleteTaskS = (userID, ids, token) => async(dispatch) => {
    try {
        
        const response = await Authservice.deletebulktask(userID, ids, token);
        
    } catch(error) {
        console.log(error);
    }
}


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
export const deleteTask = (taskid, userID, token) => async(dispatch) => {
    try {
        const response = await Authservice.deletetask(taskid, userID, token);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const deleteUsers = (userID, token, id) => async(dispatch) => {
    try {
        const response = await Authservice.deleteuser(userID, token, id);
        return response;
    } catch(error) {
        console.log(error);
    }
}


export const deleteUSERS = (Ids, token) => async(dispatch) => {
    try {
        const response = await Authservice.deleteUsers(Ids, token);
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


export const createUser = (data, token) => async(dispatch) => {
    try {
        const response = await Authservice.createuser(data, token);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const showtask = (role, userID, token, page) => async(dispatch) => {
    try {
        const response = await Authservice.showtasks(role, userID, token, page);
        dispatch(addTasks(
            {
                id : userID,
                tasks: response.data.data,
            }
        ));
        dispatch(setcurrentPage(response.data.current_page));
        dispatch(setlastPage(response.data.last_page));    
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const searchText = (input, token, page) => async(dispatch) => {
    try {
        const response = await Authservice.searchtext(input, token, page);
        if (input != ''){
            dispatch(showUsers(response.data.data));
            dispatch(currentpage(response.data.current_page));
            dispatch(lastpage(response.data.last_page));    

        } else {
            dispatch(showUsers(response.data.data));
            dispatch(currentpage(response.data.current_page));
            dispatch(lastpage(response.data.last_page));    

        }
        return response;
    } catch(error) {
        console.log(error);
    }
}


export const searchTask = (role, userID, input, token, page) => async(dispatch) => {
    try {
        const response = await Authservice.searchtask(role, userID, input, token, page);
        dispatch(addTasks(
            {
                id : userID,
                tasks: response.data.data,
            }
        ));
        dispatch(setcurrentPage(response.data.current_page));
        dispatch(setlastPage(response.data.last_page));    

        return response;
    } catch (error) {
        console.log(error);
    }
}


export const filterRole = (role, token, page) => async(dispatch) => {
    try {
        const response = await Authservice.filterrole(role, token, page);
        dispatch(showUsers(response.data.data));
        dispatch(currentpage(response.data.current_page));
        dispatch(lastpage(response.data.last_page));    

    } catch (error) {
        console.log(error);
    }
}



export const sorttask = (field, order, userID, role, token, page) => async(dispatch) => {
    try {
        const response = await Authservice.sorttask(field, order, userID, role, token, page);
        dispatch(addTasks(
            {
                id: userID,
                tasks: response.data.data,
            }
        ));
        dispatch(setcurrentPage(response.data.current_page));
        dispatch(setlastPage(response.data.last_page));    


        return response;
    } catch (error) {
        console.log(error);
    }

}

export const filterTask = (field, value, userID, role, token, page) => async(dispatch) => {
    try {
        const response = await Authservice.filtertask(field, value, userID, role, token, page);
        dispatch(addTasks(
            {
                id: userID,
                tasks: response.data.data,
            }
        ));
        dispatch(setcurrentPage(response.data.current_page));
        dispatch(setlastPage(response.data.last_page));    


        return response;
    } catch (error) {
        console.log(error);
    }
}


export const createStats = (userID, token) => async(dispatch) => {
    try {
        const response = await Authservice.completestats(userID, token);
        dispatch(setStats(response.data));
    } catch (error) {
        console.log(error);
    }
}


export const listnotifications = (token) => async(dispatch) => {
    try {
        const response = await Authservice.listNotification(token);
        dispatch(addNotifs(response.data));

    } catch (error) {
        console.log(error);
    }
}


export const deletenotification = (id, token) => async(dispatch) => {
    try {
        const response = await Authservice.deleteNotification(id, token);
    } catch(error) {
        console.log(error);
    }
}


export const clearnotifications = (token) => async(dispatch) => {
    try {
        const response = await Authservice.clearNotifications(token);
    } catch(error) {
        console.log(error);
    }
}

