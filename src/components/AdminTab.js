import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers} from '../Reducer/userSlice';
import {Accordion, Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {showUser, deleteUsers, updateuser, createUser, searchText, filterRole} from '../Reducer/actions';
import { Form } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import { useDispatch } from 'react-redux';



export default function AdminTab(){
    let user = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState({});
    const showModal = userID => {
        setModalShow({ ...modalShow, [userID]: true });
      };
    const closeModal = userID => {
        setModalShow({ ...modalShow, [userID]: false });
    };  
    function handleSubmit(event){
        event.preventDefault();
        dispatch(showUser(user.currentUser.access_token));
    }


    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();


    useEffect(() => {
        //Initialize debounce function to search once user has stopped typing every half second
        //This will run only once to intitialize, not on evry re render
        inputRef.current = _.debounce(onSearchText, 500);
      }, []);
    
      const onSearchText = (input) => {
          setLoading(true);
          dispatch(searchText(input)).then(
              (response) => {
                  setLoading(false);
              }
          );
      //   axios
          // .get(`https://www.reddit.com/search.json?q=${input}`)
          // .then((result) => {
          //   setResult(result.data.data.children);
          //   setErrorMsg('');
          //   setIsLoading(false);
          // })
          // .catch(() => {
          //   console.log(error);
          // });
      };
    
      const handleInputChange = (event) => {
        const input = event.target.value;
        setInput(input);
        inputRef.current(input);
      };


    function handleCreate(event){
        event.preventDefault();
        let name = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;
        let role = event.target[3].value;
        let data = {
            name, email, password, role
        }
        dispatch(createUser(data)).then(
            (response) => {
                dispatch(showUser(user.currentUser.access_token));
            }
        );
        // axios.post('http://localhost:8002/api/users', data). then (
        //     (response) => {
        //         console.log('user created')
        //     }, 
        //     (error) => {
        //         console.log(error)
        //     }
        // )
    }


    function deleteUser(event, userID){
        event.preventDefault();
        dispatch(deleteUsers(userID)).then(
            (response) => {
                dispatch(showUser(user.currentUser.access_token));
            }
        );
        // axios.delete("http://localhost:8002/api/users/" + userId).then(
        //     (response) => {
        //         console.log(response);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // )
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
        }
        dispatch(updateuser(data, userID)).then(
            (response) => {
                dispatch(showUser(user.currentUser.access_token));
            }
        );

    }
    const handleRole = (event, role) => {
        setLoading(true);
        event.preventDefault();
        dispatch(filterRole(role)).then(
            setLoading(false),
        )
    }

    return (
        <div>  
        <Accordion>
        <Accordion.Item eventKey= "Create User">
            <Accordion.Header>Create User</Accordion.Header>
            <Accordion.Body>
            <form onSubmit = {handleCreate}>
                <input type = 'name' placeholder = 'Name' /><br/>
                <input type = 'email' placeholder = 'Email'  /><br/>
                <input type = 'password' placeholder = 'Password'  /><br/>
                <input type = 'role' placeholder = 'Role' /><br/>
                <button type ='submit'>Create</button>
            </form>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>   
        <Accordion>
        <Accordion.Item eventKey = "Users">
        <Accordion.Header onClick={handleSubmit}>Show Users</Accordion.Header>
        <Accordion.Body>
        <div className = "dropDownHeading">
            <h6>Apply Filters</h6>
            </div>
        {/* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Role
      </Dropdown.Toggle> */}
      <div className = "dropDown">
        <DropdownButton
      align="end"
      title="Role"
      id="dropdown-menu-align-end"
      size = "sm"
    >
      {/* <Dropdown.Menu> */}
        <Dropdown.Item onClick = {(event) => handleSubmit(event)}>None</Dropdown.Item>
        <Dropdown.Item onClick = {(event) => handleRole(event, 'admin')}>Admin</Dropdown.Item>
        <Dropdown.Item onClick = {(event) => handleRole(event, 'normal')}>Normal</Dropdown.Item>
      {/* </Dropdown.Menu> */}
    {/* </Dropdown> */}
    </DropdownButton>
        </div>
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
        {loading && <p>...Loading</p>}
        {loading == false && user.users.map((user) => (   
        <Accordion key = {user.id}>
        <Accordion.Item eventKey= {JSON.stringify(user.id)}>
            <Accordion.Header>{user.id}</Accordion.Header>
            <Accordion.Body>
            <div style={{float: 'right'}}>
            <Button variant="outline-secondary" onClick = {(event) => {deleteUser(event, user.id)}}>Delete</Button>
            <Button variant="outline-secondary" onClick = {() => showModal(user.id)}>Update</Button>
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
            <p>ID = {user.id}</p>
            <p>Name = {user.name}</p>
            <p>Email = {user.email}</p>
            <p>Role = {user.role}</p>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        ))}
        </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item>
            <Accordion.Header>Delete User</Accordion.Header>
            <Accordion.Body>
                <form onSubmit = {deleteUser}>
                    <input type = 'number' placeholder = 'Id'/>
                    <button type = 'submit'>Delete</button> 
                </form>
            </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item>
            <Accordion.Header onClick = {() => setModalShow(true)}>Update User</Accordion.Header>
            <Accordion.Body>
            <Modal show={modalShow}
        onHide = {() => setModalShow(false)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit = {updateUser}>
            <h6>Please input the Id of the user you wish to update</h6>
            <input type = 'number' placeholder = 'Id'/><br/>
            <input type = 'name' placeholder = 'Name'/><br/>
            <input type = 'email' placeholder = 'Email'/><br/>
            <input type = 'role' placeholder = 'Role' /><br/>
            <input type = 'password' placeholder = 'Password'/><br/><br/>
            <button type = 'submit'>Update</button>
        </form>
      </Modal.Body>
        </Modal>
            </Accordion.Body>
        </Accordion.Item> */}
        </Accordion>

        </div>
    )
}

