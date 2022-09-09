import axios from 'axios';
import React from 'react';
import {password_resetmail} from '../Reducer/actions';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';


function PasswordResetRequest(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleClick(event){
        event.preventDefault();
       
        let email = event.target[0].value;
        let data = {
            email,
        }
        // axios.post('http://localhost:8002/password/reset-request', data);
        dispatch(password_resetmail(data)).then(
            navigate('/', {replace: true}),
        )



    }

    return (
        <form onSubmit = {handleClick}> 
            <h3>Please enter your email-id</h3>
            <input type = 'email' placeholder = 'Email'/>
            <button type = 'submit'>Submit</button>
        </form>
    )
}

export default PasswordResetRequest;