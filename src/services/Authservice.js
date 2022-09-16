import axios from "axios";
const API_URL = "http://localhost:8002/";



const create =(data, token)=>{
    let config = {
        params: {},
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };
    console.log(token);
    return axios.post(API_URL + 'api/users', data, config);
};


const Login = (data)=>{
    return axios.post(API_URL + 'api/login', data)
};


const Logout = (token) => {
    let config = {
        params: {},
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };
    return axios.post(API_URL + 'api/logout', token, config);
};


const verifyemail = (config)=>{
    return axios.post('http://localhost:8002/email/verify', null,config)
};



const password_resetmail=(data)=>{
    return axios.post('http://localhost:8002/password/reset-request', data);
};


const password_reset=(data)=>{
    return axios.post('http://localhost:8002/password/reset', data);
};


const createtask=(data)=>{
    return axios.post('http://localhost:8002/createtask', null, data);
};


const deletetask=(taskid, userID, token)=>{
    let data = {
        params: {
            userID,
        }
        , headers: {Authorization: 'Bearer ' + token}
    }
    return axios.delete('http://localhost:8002/delete/' + taskid, data);
};


const showtasks = (role, userID, token, page) => {
    if (role === 'admin') {
        return axios.get('http://localhost:8002/showtasks', {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
    } 
    return axios.get('http://localhost:8002/showtasks/' + userID, {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
};


const updatetask = (taskid, data) => {
    return axios.put('http://localhost:8002/updatetask/' + taskid, null, data)
};


const edittask = (data, taskid) => {
    return axios.put('http://localhost:8002/edittask/' + taskid, null, data);
};


const showUser = (token, page) => {
    return axios.get('http://localhost:8002/api/users', {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
}


const deleteuser = (userID, token, id) => {
    return axios.delete("http://localhost:8002/api/users/" + userID, {params: {id: id}, headers: {Authorization: 'Bearer' + token}});
}


const deleteUsers = (Ids, token) => {
    const data = {
        params : {
            Ids: Ids
        }, headers: {Authorization: 'Bearer' + token}
    }
    return axios.delete('http://localhost:8002/api/deleteUsers',data);
}

const updateuser = (data, userID) => {
    return axios.put("http://localhost:8002/api/users/" + userID, null, data);
} 

const createuser = (data, token) => {
    let config = {
        params: {},
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };
    return axios.post('http://localhost:8002/api/users', data, token);
}

const searchtext = (input, token,page) => {
    if (input == ''){
        return axios.get('http://localhost:8002/api/users', {params: {page: 1}, headers: {Authorization: 'Bearer' + token}});
    }
    return axios.get('http://localhost:8002/search/' + input, {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
}

const searchtask = (role, userID, input, token, page) => {
    if (role === 'admin'){
        return axios.get('http://localhost:8002/searchtask/' + input, {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
    } 
    return axios.get('http://localhost:8002/searchtask/' + input + '/' + userID, {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
}


const filterrole = (role, token, page) => {
    return axios.get('http://localhost:8002/filterrole/role/' + role, {params: {page: page}, headers: {Authorization: 'Bearer' + token}});
}


const sorttask = (field, order, userID, role, token, page) => {
    if (role == 'admin'){
        return axios.get('http://localhost:8002/sorttaskadmin/' + field + '/' + order, {params: {page: page},headers: {Authorization: 'Bearer' + token}});
    } 
    return axios.get('http://localhost:8002/sorttask/' + field + '/' + order + '/' + userID, {params: {page: page},headers: {Authorization: 'Bearer' + token}});
}


const filtertask = (field, value, userID, role, token, page) => {
    if (role == 'admin'){
        return axios.get('http://localhost:8002/filtertaskadmin/' + field + '/' + value, {params: {page: page},headers: {Authorization: 'Bearer' + token}});
    } 
    return axios.get('http://localhost:8002/filtertask/' + field + '/' + value + '/' + userID, {params: {page: page},headers: {Authorization: 'Bearer' + token}});
}



const deletebulktask = (userID, ids, token, page) => {
    let data = {ids : ids, userID: userID};
    return axios.post('http://localhost:8002/deletebulktasks',data, {params: {page: page},headers: {Authorization: 'Bearer' + token}});
}


const completestats = (userID, token) => {
    return axios.get('http://localhost:8002/statsOwner', {params: {id: userID}, headers: {Authorization: 'Bearer' + token}})
}


const listNotification = (token) => {
    return axios.get('http://localhost:8002/listNotifs', {headers: {Authorization: 'Bearer' + token}});
}

const deleteNotification = (id, token) => {
    return axios.delete('http://localhost:8002/notif/' + id, {headers: {Authorization: 'Bearer' + token}});
}


const clearNotifications = (token) => {
    return axios.delete('http://localhost:8002/clear-notif', {headers: {Authorization: 'Bearer' + token}});
}


export default {
    create,
    Login,
    Logout,
    verifyemail,
    password_resetmail,
    password_reset,
    createtask,
    deletetask,
    showtasks,
    updatetask,
    edittask,
    deleteuser,
    updateuser,
    searchtext,
    filterrole,
    searchtask,
    showUser,
    sorttask,
    createuser,
    filtertask,
    deleteUsers,
    deletebulktask,
    completestats,
    listNotification,
    deleteNotification,
    clearNotifications
};