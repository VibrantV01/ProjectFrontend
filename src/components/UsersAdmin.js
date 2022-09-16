import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers} from '../Reducer/userSlice';
import {Accordion, Button, Card} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {showUser, deleteUsers, updateuser, createUser, searchText, filterRole, deleteUSERS} from '../Reducer/actions';
import { Form } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';

export default function UsersAdmin(){
    let user = useSelector(state => state.users);
    const [page, setPage] = React.useState(1);
    const [showpn, setShowpn] = React.useState(true);
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState({});
    const showModal = userID => {
        setModalShow({ ...modalShow, [userID]: true });
      };
    const closeModal = userID => {
        setModalShow({ ...modalShow, [userID]: false });
    };  
    const [loading, setLoading] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        dispatch(showUser(user.currentUser.access_token, page)).then(
            setShowpn(true),
        )
    }
    function clickNext(event){
        event.preventDefault();
        setLoading(true);
        dispatch(showUser(user.currentUser.access_token, page + 1)).then(
            setLoading(false),
            setShowpn(true),
        );
        setPage(page + 1);
    }
    function clickPrev(event){
        setLoading(true);
        event.preventDefault();
        if (page > 1){
            dispatch(showUser(user.currentUser.access_token, page - 1)).then(
                setLoading(false),
                setShowpn(true),
            );
            setPage(page - 1);
        }
    }

    


    const [showcreate, setShowcreate] = React.useState(false);
    const [input, setInput] = useState('');
    const inputRef = useRef();


    useEffect(() => {
        //Initialize debounce function to search once user has stopped typing every half second
        //This will run only once to intitialize, not on evry re render
        inputRef.current = _.debounce(onSearchText, 500);
      }, []);
    
      const onSearchText = (input) => {
          setLoading(true);
          dispatch(searchText(input, user.currentUser.access_token)).then(
              (response) => {
                  setLoading(false);
                  if (input != ''){
                  setShowpn(false);
                  };
                  if (input == ''){
                    setShowpn(true);
                  };
              }
          );
      };
    
      const handleInputChange = (event) => {
        const input = event.target.value;
        setInput(input);
        inputRef.current(input);
      };




    function handleCreate(event){
        event.preventDefault();
        setShowcreate(false);
        let name = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;
        let role = event.target[3].value;
        let token = user.currentUser.access_token;
        let data = {
            name, email, password, role, token,
        }
        
        dispatch(createUser(data, user.currentUser.access_token)).then(
            (response) => {
                dispatch(showUser(user.currentUser.access_token, page)).then(
                setShowpn(true),
                )
            }
        );
    }


    function deleteUser(event, userID){
        event.preventDefault();

        dispatch(deleteUsers(userID, user.currentUser.access_token)).then(
            (response) => {
               dispatch(showUser(user.currentUser.access_token, page)).then(
                setShowpn(true),
               )
            }
        );
        
    }
    

    function updateUser(event, userID){
        event.preventDefault();
        closeModal(userID);
        let name = event.target[0].value;
        let email = event.target[1].value;
        let role = event.target[2].value;
        let password = event.target[3].value;
        let data = {
            params: {
            name, email, role, password
            }
            , headers: {Authorization: 'Bearer' + user.currentUser.access_token}
        }
        dispatch(updateuser(data, userID, user.currentUser.access_token)).then(
            (response) => {
                dispatch(showUser(user.currentUser.access_token, page)).then(
                    setShowpn(true),
                )
            }
        );

    }
    const handleRole = (event, role) => {
        setLoading(true);
        event.preventDefault();
        dispatch(filterRole(role, user.currentUser.access_token)).then(
            setLoading(false),
            setShowpn(false),
        )
    }


    return (
        <div>  
        <Button variant="outline-secondary" onClick = {() => setShowcreate(true)}>Create User</Button>
        <Modal show={showcreate}
        onHide = {()=>setShowcreate(false)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit = {(event)=>handleCreate(event)}>
                <input type = 'name' placeholder = 'Name' /><br/>
                <input type = 'email' placeholder = 'Email'  /><br/>
                <input type = 'password' placeholder = 'Password'  /><br/>
                <input type = 'role' placeholder = 'Role' /><br/>
                <button type ='submit'>Create</button>
            </form>
      </Modal.Body>
        </Modal>
        <div className = "dropDownHeading">
            <h6>Apply Filters</h6>
            </div>
        
      <div className = "dropDown">
        <DropdownButton
      align="end"
      title="Role"
      id="dropdown-menu-align-end"
      size = "sm"
    >
      
        <Dropdown.Item onClick = {(event) => handleSubmit(event)}>None</Dropdown.Item>
        <Dropdown.Item onClick = {(event) => handleRole(event, 'admin')}>Admin</Dropdown.Item>
        <Dropdown.Item onClick = {(event) => handleRole(event, 'normal')}>Normal</Dropdown.Item>
      
    
    </DropdownButton>
        </div>

        <div className = "searchingadmin">
        <Form>
                <Form.Group controlId="search">
                  <Form.Control
                    type="search"
                    placeholder="Enter text to search"
                    onChange={(event)=>handleInputChange(event)}
                    value={input}
                    autoComplete="off"
                  />
            </Form.Group>  
        </Form>  
        </div>
        <div className = "list">
        {loading && <p>...Loading</p>}
        {loading == false && user.users.map((user) => (   
        <Card key = {user.id}>
            <Card.Header>{user.id}</Card.Header>
            <Card.Body>
            <Card.Title><Link to = {`/UserPage/user/${user.id}`} style={{ textDecoration: 'none' }}>{user.name}</Link></Card.Title>
            <Card.Text>
                <p>Email: {user.email}</p>
                {user.role == 'admin' && <p>Role: Admin</p>}
                {user.role == 'normal' && <p>Role: Normal</p>}
            <div style={{float: 'right'}}>
            <Button variant="danger" onClick = {(event) => {deleteUser(event, user.id)}}>Delete</Button>
            <Button variant="secondary" onClick = {() => showModal(user.id)}>Update</Button>
            <Modal show={modalShow[user.id]}
        onHide = {() => closeModal(user.id)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit = {(event) => {updateUser(event, user.id)}}>
            <h6>Please input the Id of the user you wish to update</h6>
            <input type = 'name' placeholder = 'Name'/><br/>
            <input type = 'email' placeholder = 'Email'/><br/>
            <input type = 'role' placeholder = 'Role' /><br/>
            <input type = 'password' placeholder = 'Password'/><br/><br/>
            <button type = 'submit'>Update</button>
        </form>
      </Modal.Body>
        </Modal>

            </div>
            </Card.Text>
            </Card.Body>
        </Card>
        ))}
    </div>
    {showpn && <div><Button onClick = {(event) => {clickPrev(event)}}>Previous</Button> | {user.currentpage} | <Button onClick = {(event) => {clickNext(event)}}>Next</Button></div>}
        </div>
    )
}

