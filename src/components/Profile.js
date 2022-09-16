import React from 'react';
import {Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {password_resetmail} from '../Reducer/actions';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';



export default function Profile() {
    const user = useSelector(state => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleClick(event){
        event.preventDefault();
        let data = {
            email : user.currentUser.user.email,
        }
        dispatch(password_resetmail(data)).then(
            (response) => {
                console.log(response);
            }
        )



    }


    return (
        <div className = 'Profile'>
        <h1>Hey {user.currentUser.user.name}!</h1>
        <h4>Below are your profile details</h4>
        <h5>Name: {user.currentUser.user.name}</h5>
        <h5>Email: {user.currentUser.user.email}</h5>
        <h5>Role: {user.currentUser.user.role}</h5>
        <Button onClick = {(event) => handleClick(event)}>Reset Password</Button>
        </div>

    )
}