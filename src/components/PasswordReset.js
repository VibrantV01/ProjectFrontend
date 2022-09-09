import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {password_reset} from '../Reducer/actions';
import {useDispatch} from 'react-redux';


function PasswordReset(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        const urlToken = new URL (window.location.href);
        const token = urlToken.searchParams.get('token');
        const email = urlToken.searchParams.get('email');
        
        let password = event.target[0].value;
        let password_confirmation = event.target[1].value;

        let data = {
            email, password, password_confirmation, token
        }
        dispatch(password_reset(data)).then(
            navigate('/', {replace: true})
        )
        // axios.post('http://localhost:8002/password/reset', data);
        //  navigate('/', {replace: true});

    }


    return (
        <form onSubmit = {handleSubmit}>
            <input type = 'password' placeholder = 'Password'/>
            <input type = 'password' placeholder = 'Password Confirmation'/>
            <button type = 'submit'>Submit</button>
        </form>
    )
}

export default PasswordReset;