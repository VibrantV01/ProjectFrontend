import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {showUsers, setUsers} from '../Reducer/userSlice';
import Accordion from 'react-bootstrap/Accordion';
import {showUser, searchText, filterRole} from '../Reducer/actions';
import { Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



export default function Users(){
    let user = useSelector(state => state.users);
    const [page, setPage] = React.useState(1);
    const [showpn, setShowpn] = useState(true);
    const dispatch = useDispatch();
    function handleSubmit(event){
        event.preventDefault();
        dispatch(showUser(user.currentUser.access_token, 1));
    }
    const [loading, setLoading] = useState(false);

    function clickNext(){
        setLoading(true);
        dispatch(showUser(user.currentUser.access_token, page + 1)).then(
            setLoading(false)
        );
        setPage(page + 1);
    }
    function clickPrev(){
        setLoading(true);
        if (page > 1){
            dispatch(showUser(user.currentUser.access_token, page - 1)).then(
                setLoading(false),
                setShowpn(true),
            );
            setPage(page - 1);
        }
    }
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const inputRef = useRef();
      
        useEffect(() => {
          //Initialize debounce function to search once user has stopped typing every half second
          //This will run only once to intitialize, not on evry re render
          inputRef.current = _.debounce(onSearchText, 500);
        }, []);
      
        const onSearchText = (input) => {
            setLoading(true);
            setShowpn(false);
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

    const [order, setOrder] = React.useState('asc');
    const [sort, setSort] = React.useState("id");

    
      
        const handleInputChange = (event) => {
          const input = event.target.value;
          setInput(input);
          inputRef.current(input);
        };
      
    
        const handleRole = (event, role) => {
            setShowpn(false);
            setLoading(true);
            event.preventDefault();
            dispatch(filterRole(role, user.currentUser.access_token)).then(
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
              </Card.Text>
            </Card.Body>
          </Card>
        
        ))}
        </div>
    {showpn && <div><Button onClick = {(event) => {clickPrev(event)}}>Previous</Button> | {user.currentpage} | <Button onClick = {(event) => {clickNext(event)}}>Next</Button></div>}
    </div>
    )
}