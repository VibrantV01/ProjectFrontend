import axios from "axios";
const API_URL = "http://localhost:8002/";



const create =(data)=>{
    return axios.post(API_URL + 'api/users', data);
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


const deletetask=(taskid, userID)=>{
    let data = {
        params: {
            userID,
        }
    }
    return axios.delete('http://localhost:8002/delete/' + taskid, data);
};


const showtasks = (role, userID) => {
    if (role === 'admin') {
        return axios.get('http://localhost:8002/showtasks');
    } 
    return axios.get('http://localhost:8002/showtasks/' + userID);
};


const updatetask = (taskid, data) => {
    return axios.put('http://localhost:8002/updatetask/' + taskid, null, data)
};


const edittask = (data, taskid) => {
    return axios.put('http://localhost:8002/edittask/' + taskid, null, data);
};


const showUser = (token) => {
    let config = {
        param: {

        }, 
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    return axios.get('http://localhost:8002/api/users', null, config);
}


const deleteuser = (userID) => {
    return axios.delete("http://localhost:8002/api/users/" + userID);
}

const updateuser = (data, userID) => {
    return axios.put("http://localhost:8002/api/users/" + userID, null, data);
} 

const createuser = (data) => {
    return axios.post('http://localhost:8002/api/users', data);
}

const searchtext = (input) => {
    return axios.get('http://localhost:8002/search/' + input);
}

const searchtask = (role, userID, input) => {
    if (role === 'admin'){
        return axios.get('http://localhost:8002/searchtask/' + input);
    } 
    return axios.get('http://localhost:8002/searchtask/' + input + '/' + userID);
}


const filterrole = (role) => {
    return axios.get('http://localhost:8002/filterrole/' + role);
}


const sorttask = (field, order, userID, role) => {
    if (role == 'admin'){
        return axios.get('http://localhost:8002/sorttaskadmin/' + field + '/' + order);
    } 
    return axios.get('http://localhost:8002/sorttask/' + field + '/' + order + '/' + userID);
}


const filtertask = (field, value, userID, role) => {
    if (role == 'admin'){
        return axios.get('http://localhost:8002/filtertaskadmin/' + field + '/' + value);
    } 
    return axios.get('http://localhost:8002/filtertask/' + field + '/' + value + '/' + userID);
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
};