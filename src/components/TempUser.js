import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers, setUsers} from '../Reducer/userSlice';
import Accordion from 'react-bootstrap/Accordion';
import {showUser, searchText, filterRole, createTask, showtask, createStats} from '../Reducer/actions';
import { Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Card, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function TempUser(){
    let user = useSelector(state => state.users);
    const [task, setTask] = useState('show');
    const [role, setRole] =  useState('normal');
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [sort, setSort] = React.useState("id");
    const [modalTask, setModalTask] = useState({});

    const showModalTask = (userID) => {
        setModalTask({...modalTask, [userID]: true});
        console.log(userID);
        console.log(modalTask[userID]);
    }
    const closeModalTask = (userID) => {
        setModalTask({...modalTask, [userID]: false});
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(showUser(user.currentUser.access_token, 1)).then(
            setTask('show'),
        )
    }
    

    function clickNext(){
        setLoading(true);
        if (task == 'show'){
            dispatch(showUser(user.currentUser.access_token, user.currentpage + 1)).then(
                setLoading(false)
            );
        } else if (task == 'search'){
            dispatch(searchText(input, user.currentUser.access_token, user.currentpage + 1)).then(
                setLoading(false)
            );
        } else if (task == 'filter'){
            dispatch(filterRole(role, user.currentUser.access_token, user.currentpage + 1)).then(
                setLoading(false)
            );
        }
    }
    function clickPrev(){
        setLoading(true);
        if (user.currentpage > 1){
            if (task == 'show'){
                dispatch(showUser(user.currentUser.access_token, user.currentpage - 1)).then(
                    setLoading(false)
                );
            } else if (task == 'search'){
                dispatch(searchText(input, user.currentUser.access_token, user.currentpage - 1)).then(
                    setLoading(false)
                );
            } else if (task == 'filter'){
                dispatch(filterRole(role, user.currentUser.access_token, user.currentpage - 1)).then(
                    setLoading(false)
                );
            }
        }
    }
    
      
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
                    setTask('search');
                }
            );
        
        };

        function handleCreateTask(event, userID, userName){
            event.preventDefault();
            closeModalTask(userID);
            let title = event.target[0].value;
            let description = event.target[1].value;
            let due_date = event.target[2].value;
            let asigned_to = userID;
            let assigned_by = user.currentUser.user.id;
            let asigned_to_name = userName;
            let assigned_by_name = user.currentUser.user.name;
            let data = {
                params: {
                    title, description, due_date, asigned_to, assigned_by, asigned_to_name, assigned_by_name
                }, headers: {Authorization: 'Bearer' + user.currentUser.access_token}
            }
            dispatch(createTask(data, user.currentUser.access_token)).then(
                (response) => {
                    setLoading(true);
                    dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, 1)).then(
                    dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token)).then(
                        (response) => {
                            console.log(response);
                            setLoading(false);
                        }
                    )
                    )
                }
            );
            
        }
    

    
      
        const handleInputChange = (event) => {
          const input = event.target.value;
          setInput(input);
          inputRef.current(input);
        };
      
    
        const handleRole = (event, Role) => {
            setLoading(true);
            setRole(Role);
            event.preventDefault();
            dispatch(filterRole(Role, user.currentUser.access_token)).then(
                setTask('filter'),
                setLoading(false),
            )
        }

    return (
        <div>
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
                    onChange={handleInputChange}
                    value={input}
                    autoComplete="off"
                  />
            </Form.Group>  
        </Form>  
        </div>

        

       
        
        
        <table className='table'>
        <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        {loading && <p>...Loading</p>}
        {loading == false && user.users.length == 0 && <p style = {{justifyContent: 'center'}}>No data to show</p>}
        {loading == false && user.users.map((user) => (
            
            
                
            <tr>
            <td><p>{user.id}</p></td>
            <td><Link to = {`/UserPage/user/${user.id}`} style={{ textDecoration: 'none' }}>{user.name}</Link></td>
                <td><p>{user.email}</p></td>
                {user.role == 'admin' && <td><p>Admin</p></td>}
                {user.role == 'normal' && <td><p>Normal</p></td>}
                <td><Button variant="secondary" style={{backgroundColor:'#0000FF' ,color:'FFFFFF'}} onClick = {() => showModalTask(user.id)}>Assign Task</Button></td>
                <Modal show={modalTask[user.id]}
        onHide = {() => closeModalTask(user.id)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Task Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit = {(event) => handleCreateTask(event, user.id, user.name)}>
                <input type = 'title' placeholder = 'title'/><br/>
                <input type = 'description' placeholder = 'description' /><br/>
                <input type = 'date' placeholder = 'due date' /><br/>
                <Button variant="secondary" type = 'submit'>Create Task</Button>
            </form>
      </Modal.Body>
        </Modal>
                </tr>
                
            ))}
            </table>
         
    {user.currentpage > 1 && <Button style = {{marginRight: '20px'}} onClick = {(event) => {clickPrev(event)}}>Previous</Button>}  {user.currentpage}  {user.currentpage < user.lastpage && <Button style = {{marginLeft: '20px'}} onClick = {(event) => {clickNext(event)}}>Next</Button>}
    </div>
    )
}