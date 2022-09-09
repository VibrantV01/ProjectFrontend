import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashBoard from './DashBoard';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {verifyemail} from '../Reducer/actions'


function VerifyEmail(){
    const dispatch = useDispatch();
    const urlToken = new URL (window.location.href);
    const Token = urlToken.searchParams.get('token');
    const navigate = useNavigate();
    let config = {
        param:{
        },
        headers: {
            Authorization: 'Bearer ' +  Token,
        }
    }
    dispatch(verifyemail(config));
    // axios.post('http://localhost:8002/email/verify', null,config).then(
    //     (response) => {
    //         console.log(response);
    //     },
    //     (error) => {
    //         console.log(error);
    //     }
    // )

    return (
        <div>
            <h1>Yay! Email Verified!</h1>
            <h3>Please login again</h3>
            <button onClick = {() => {
                navigate('/Login', {replace: true});
                }}>Login</button>

            
        </div>
    )
}

export default VerifyEmail;