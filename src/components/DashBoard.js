import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../Reducer/userSlice';
import {useSelector} from 'react-redux';
import UserTab from './UserTab';
import {Tabs, Tab} from 'react-bootstrap';
import {removeUsers} from '../Reducer/userSlice';
import Card from 'react-bootstrap/Card';
import AdminTab from './AdminTab';
import UserTask from './UserTask';
import AdminTask from './AdminTask';
import {showUser, showtask} from '../Reducer/actions';



function DashBoard() {
        const navigate = useNavigate();
        const user = useSelector(state => state.users);
        const dispatch = useDispatch();
        function handleClick(event){
            let token = user.currentUser.access_token;
            console.log(token);
            event.preventDefault();
            let config = {
                params: {},
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }
            axios.post('http://localhost:8002/api/logout', token, config).then (
                (response) => {
                    console.log(response);
                    dispatch(logout());
                    dispatch(removeUsers());
                },
                (error) => {
                    console.log(error);
                }
            )
            navigate('/', {replace:true});
        }

        function handleEmailVerification(event){
            event.preventDefault();
            let Token = user.currentUser.access_token;
            let config = {
                headers: {
                    Authorization: 'Bearer ' + Token,
                }
            }
            axios.post('http://localhost:8002/email/request-verification', null, config).then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    
        return (
            // <div>
            //      <head>
            //         <title>Pusher Test</title>
            //         <script src="https://js.pusher.com/7.2/pusher.min.js"></script>
            //         <script>

            //             // Enable pusher logging - don't include this in production
            //             Pusher.logToConsole = true;

            //             var pusher = new Pusher('7e4f96f1381b51749e6a', {
            //             cluster: 'ap2'
            //             });

            //             var channel = pusher.subscribe('my-channel');
            //             channel.bind('my-event', function(data) {
            //             alert(JSON.stringify(data));
            //             });
            //         </script>
            //         </head>
            







            <div>
            {user.currentUser.user.email_verified_at != null && 
            <div>
            <nav>
            <button onClick = {handleClick}>Logout</button>
            </nav>
            <h1>Welcome to your Page!</h1>
            <Tabs defaultActiveKey = 'Profile'>
                <Tab eventKey = 'Profile' title = 'Profile'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>Hello {user.currentUser.user.name}!</Card.Title>
                    <Card.Text>
                        Id: {user.currentUser.user.id} <br/>
                        Name: {user.currentUser.user.name} <br/>
                        Email: {user.currentUser.user.email} <br/>
                        Role: {user.currentUser.user.role} <br/>
          
            </Card.Text>
        </Card.Body>
        </Card>
                </Tab>
                {user.currentUser.user.role === 'normal' && <Tab eventKey = 'Users' title = 'Users'>
                    <UserTab/>
                </Tab>
                }
                {user.currentUser.user.role === 'normal' && <Tab eventKey = 'UserTasks' title = 'UserTasks'>
                    <UserTask/>
                </Tab>
                }
            {user.currentUser.user.role === 'admin' && <Tab eventKey = 'AdminTasks' title = 'AdminTasks'>
                <AdminTask/>
                </Tab>
                }
                {user.currentUser.user.role === 'admin' && <Tab eventKey = 'Admin' title = 'Admin'>
                    <AdminTab/>
                </Tab>
                }

            </Tabs>
            </div>

}
{user.currentUser.user.email_verified_at === null && 
<div>
<h1>Please Verify Email and Login again!</h1>
{user.currentUser.user.email_verified_at == null && <button onClick = {handleEmailVerification}>Verify Email</button>}
<h3>If email is alredy verified, please login again.</h3>
<button onClick = {handleClick}>Logout</button>
</div>
}
            </div>
          
        )
    
}

export default DashBoard;