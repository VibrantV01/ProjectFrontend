import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { showUser, showtask, createStats, clearnotifications, deletenotification, listnotifications} from '../Reducer/actions';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Badge, Offcanvas } from 'react-bootstrap';
import { logout } from '../Reducer/userSlice';
import { removeUsers } from '../Reducer/userSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import Pusher from "pusher-js";


function UserPage() {
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifications = useSelector(state => state.notifications);
    const [show, setShow] = React.useState(false);


    useEffect(() => {

        Pusher.logToConsole = true;
    
        var pusher = new Pusher('7e4f96f1381b51749e6a', {
          cluster: 'ap2'
        });
    
        var channel = pusher.subscribe('my-channel-' + user.currentUser.user.id);
        channel.bind('my-event', function(data) {
          alert(JSON.stringify(data));
        });
    
    
    }, []);

    useEffect(() => {

        dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, 1)).then(
            (response) => {
                console.log('task updated');
                dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token));
            }
        );


    }, []);
    

    useEffect(() => {
        dispatch(showUser(user.currentUser.access_token, 1)).then(
            (response) => {
                console.log('user updated');
            }
        )
    }, []);

    useEffect(() => {
        dispatch(listnotifications(user.currentUser.access_token)).then(
            (response) => {
                console.log(response);
        })
    }, []);
    


    function handleClick(event) {
        let token = user.currentUser.access_token;
        console.log(token);
        event.preventDefault();
        let config = {
            params: {},
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        axios.post('http://localhost:8002/api/logout', token, config).then(
            (response) => {
                console.log(response);
                dispatch(logout());
                dispatch(removeUsers());
            },
            (error) => {
                console.log(error);
            }
        )
        navigate('/', { replace: true });
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


    function showNotification(event){
        event.preventDefault();
        setShow(true);
        dispatch(listnotifications(user.currentUser.access_token)).then(
            (response) => {
                console.log(response);
            }
        )
    }

    function handleDelete(event, id) {
        event.preventDefault();
        dispatch(deletenotification(id, user.currentUser.access_token)).then(
            dispatch(listnotifications(user.currentUser.access_token)).then(
                (response) => {
                    console.log(response);
                }
            )
        )
    }

    function deleteAll(event) {
        event.preventDefault();
        dispatch(clearnotifications(user.currentUser.access_token)).then(
            dispatch(listnotifications(user.currentUser.access_token)).then(
                (response) => {
                    console.log(response);
                }
            )
        )
    }





    return (
        <div className = "DashBoard">

{user.currentUser.user.email_verified_at === null && 
<div>
<h1>Please Verify Email and Login again!</h1>
<button onClick = {handleEmailVerification}>Verify Email</button>
<h3>If email is alredy verified, please login again.</h3>
<button onClick = {handleClick}>Logout</button>
</div>
}

{user.currentUser.user.email_verified_at != null && 
        <div>
            <nav>

                {user.currentUser.user.role == 'admin' && 
                <div className = "Navbar" style={{display:"flex", padding:"10px", background_color: "#333", overflow: "hidden" }}>
                    <div><NavLink to="Home" style={{ textDecoration: 'none' }}  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink> | <NavLink to="UsersAdmin" style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Users</NavLink> | <NavLink to="Tasks" style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Tasks</NavLink></div>
                    <div><NavLink to="Profile" style={{ textDecoration: 'none' }}  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink></div><div style={{marginLeft:"auto"}} >
                    <Button variant="primary" onClick = {(event) => showNotification(event)}  style={{marginRight:"5px"}}>
      Notifications <Badge bg="secondary">{notifications.Notifications.length}</Badge>
      <span className="visually-hidden">messages</span>
    </Button><Button onClick={(event) => handleClick(event)}>Logout</Button></div></div>}
                {user.currentUser.user.role == 'normal' && <div className = "Navbar" style={{display:"flex", padding:"10px", background_color: "#333", overflow: "hidden" }}>
                    <div><NavLink to="Home" style={{ textDecoration: 'none' }}  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink> | <NavLink to="Users" style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Users</NavLink> | <NavLink to="Tasks" style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Tasks</NavLink></div>
                    <div><NavLink to="Profile" style={{ textDecoration: 'none' }}  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile</NavLink></div><div style={{marginLeft:"auto"}} >
                    <Button variant="primary" onClick={(event) => showNotification(event)}  style={{marginRight:"5px"}}>
      Notifications <Badge bg="secondary">{notifications.Notifications.length}</Badge>
      <span className="visually-hidden">messages</span>
    </Button><Button onClick={(event) => handleClick(event)}>Logout</Button></div></div>}

            </nav>

            <Offcanvas placement = 'end' show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>   
        {notifications.Notifications.map((Notification) => (
            <div className="notif-content">
                <button onClick={(event) => handleDelete(event, Notification.id)} className='notif-delete-button' style = {{marginLeft: 'auto'}}>X</button>
                <p>{Notification.notification}</p>
            
            </div>
        
        ))}
        <Button onClick = {(event) => deleteAll(event)}>Clear All</Button>
        </Offcanvas.Body>
      </Offcanvas>

            <Outlet />
            </div>
}
        </div>
    );
}


export default UserPage;