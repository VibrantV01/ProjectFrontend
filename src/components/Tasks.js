import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addTasks} from '../Reducer/taskSlice'
import {Accordion, Button, Card, Dropdown, DropdownButton} from 'react-bootstrap';
import { Chart } from "react-google-charts";
import {createTask, deleteTask, showtask, updatetask, edittask, searchTask, sorttask, filterTask, deleteTaskS, createStats} from '../Reducer/actions';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import _ from 'lodash';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';



export default function Tasks(){
    let task = useSelector(state => state.tasks);
    let user = useSelector(state => state.users);
    const [editmodalShow, seteditModalShow] = React.useState({});
    const [updatemodalShow, setupdateModalShow] = React.useState({});
    const [ids, setIds] = React.useState([]);
    const changeIds = (taskID) => {
        if (ids.includes(taskID)){
            setIds(ids =>
                ids.filter(ids => {
                  return ids !== taskID;
                }),
              );
        } else {
            setIds(ids => [...ids, taskID]);
        }
    }
    const showeditModal = taskID => {
        seteditModalShow({...editmodalShow, [taskID]: true});
    };
    const closeeditModal = taskID => {
        seteditModalShow({...editmodalShow, [taskID]: false});
    }
    const showupdatemodalShow = taskID => {
        setupdateModalShow({ ...updatemodalShow, [taskID]: true });
      };
    const closeupdatemodalShow = taskID => {
        setupdateModalShow({ ...updatemodalShow, [taskID]: false });
    };  

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const deletebulktasks = (event)=>{
        event.preventDefault();
        setLoading(true);
        dispatch(deleteTaskS(user.currentUser.user.id, ids, user.currentUser.access_token)).then(
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token)),
                setLoading(false),
        )
    }

    const [input, setInput] = useState('');
    const inputRef = useRef();
      
        useEffect(() => {
          //Initialize debounce function to search once user has stopped typing every half second
          //This will run only once to intitialize, not on evry re render
          inputRef.current = _.debounce(onSearchTask, 500);
        }, []);
      
        
        const onSearchTask = (input) => {
            setLoading(true);
            let role = user.currentUser.user.role;
            let userID = user.currentUser.user.id;
            dispatch(searchTask(role, userID, input, user.currentUser.access_token)).then(
                (response) => {
                    setLoading(false);
                }
            );
        
        };
      
        const handleInputChange = (event) => {
          const input = event.target.value;
          setInput(input);
          inputRef.current(input);
        };
        


    function handleSubmit(event){
        event.preventDefault();
        let role = user.currentUser.user.role;
        let userID = user.currentUser.user.id;
        dispatch(showtask(role, userID, user.currentUser.access_token));
        
    }

    const [open, setOpen] = useState(false);


    function handleDelete(event, taskid){
        event.preventDefault();
        let userID = user.currentUser.user.id;
        dispatch(deleteTask(taskid, userID, user.currentUser.access_token)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token)).then(
                dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token)).then(
                    (response) => {
                        console.log(response);
                    }
                )
                )
            }
        );
        
    }

    function handleCreate(event){
        event.preventDefault();
        setShowcreate(false);
        let title = event.target[0].value;
        let description = event.target[1].value;
        let due_date = event.target[2].value;
        let asigned_to = event.target[3].value;
        let assigned_by = user.currentUser.user.id;

        let data = {
            params: {
                title, description, due_date, asigned_to, assigned_by
            }, headers: {Authorization: 'Bearer' + user.currentUser.access_token}
        }
        dispatch(createTask(data, user.currentUser.access_token)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token)).then(
                    dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token)).then(
                        (response) => {
                            console.log(response);
                        }
                    )
                    )
            }
        );
        
    }
    function handleUpdate(event, taskid){
        event.preventDefault();
        closeupdatemodalShow(taskid);
        let userID = user.currentUser.user.id;
        let status = event.target[0].value;
        let data = {
            params: {
                status, userID
            }
            , headers: {Authorization: 'Bearer' + user.currentUser.access_token}
        }
        dispatch(updatetask(taskid, data, user.currentUser.access_token)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token)).then(
                    dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token)).then(
                        (response) => {
                            console.log(response);
                        }
                    )
                    )
            }
        );
        
    }

    
    const [order, setOrder] = React.useState('None');
    const [sort, setSort] = React.useState("");
    function sortTask(event){
        event.preventDefault();
        setLoading(true);
        let userID = user.currentUser.user.id;
        let role = user.currentUser.user.role;
        if (order != 'None' && sort != ""){
            dispatch(sorttask(sort, order, userID, role, user.currentUser.access_token)).then(
                (response) => {
                    setSort("");
                    setOrder('None');
                    setLoading(false);
                }
            );
        }

    }
    const filtertask = (field, value) => {
        // event.preventDefault();
        setLoading(true);
        // let field = event.target[0].value;
        // let value = event.target[1].value;
        let userID = user.currentUser.user.id;
        let role = user.currentUser.user.role;
        field = field.toLowerCase();
        value = value.toLowerCase();
        if (field == 'assigned to'){
            field = 'asigned_to';
        }
        if (field == 'created by'){
            field = 'assigned_by';
        }
        console.log(field);
        console.log(value);
        dispatch(filterTask(field, value, userID, role, user.currentUser.access_token)).then(
        (response) => {
            setLoading(false);
        }
        );
    }
    function handleEdit(event, taskid){
        event.preventDefault();
        closeeditModal(taskid);
        let title = event.target[0].value;
        let description = event.target[1].value;
        let due_date = event.target[2].value;
        let userID = user.currentUser.user.id;
        let data = {
            params: {
                title, description, userID, due_date
            }
            , headers: {Authorization: 'Bearer' + user.currentUser.access_token}
        }
        dispatch(edittask(data, taskid, user.currentUser.access_token)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token));
            }
        );
        
    }

    



      const [showcreate, setShowcreate] = React.useState(false);

    return (


        
        <div style={{}}>
            <div className = "createdelete" >
            <Button variant="danger" onClick = {(event) => {deletebulktasks(event)}}>Delete</Button>
            </div>
            
            



{/* Create Button */}
{/* <Button variant="secondary" onClick = {() => setShowcreate(true)}>Create Tasks</Button>
        <Modal show={showcreate}
        onHide = {() => setShowcreate(false)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit = {(event) => handleCreate(event)}>
                <input type = 'title' placeholder = 'title'/><br/>
                <input type = 'description' placeholder = 'description' /><br/>
                <input type = 'date' placeholder = 'due date' /><br/>
                <input type = 'asigned_to' placeholder = 'assigned to' /><br/>
                <Button variant="secondary" type = 'submit'>Create Task</Button>
            </form>
      </Modal.Body>
        </Modal> */}




{/* Bulk Delete Button */}
        


        <div className = "sortingfiltering">
        {/* Sorting*/}
        <div className = "sorting">
         <DropdownButton
      align="end"
      title="Sort by"
      id="dropdown-menu-align-end"
      size = "sm"
        >
      



  
        <Dropdown.Item onClick = {() => setSort('id')}>Id</Dropdown.Item>
        <Dropdown.Item onClick = {() => setSort('title')}>Title</Dropdown.Item>
        <Dropdown.Item onClick = {() => setSort('assigned_by')}>Assigned_by</Dropdown.Item>
        <Dropdown.Item onClick = {() => setSort('asigned_to')}>Assigned_to</Dropdown.Item>

      
    </DropdownButton>
    <DropdownButton
      align="end"
      title="Order"
      id="dropdown-menu-align-end"
      size = "sm"
    >
      
        <Dropdown.Item onClick = {() => setOrder('asc')}>Ascending</Dropdown.Item>
        <Dropdown.Item onClick = {() => setOrder('desc')}>Descending</Dropdown.Item>
      
    </DropdownButton>
    <Button size = "sm" onClick = {(event) => sortTask(event)}>Sort</Button>
    </div>

<div className = "filtering">
{/* Filter  */}
<DropdownButton
      align="end"
      title="Filter"
      id="dropdown-menu-align-end"
      size = "sm"
    >     
      
        <Dropdown.Item onClick = {() => filtertask('status','completed')}>Completed</Dropdown.Item>
        <Dropdown.Item onClick = {() => filtertask('status','deleted')}>Deleted</Dropdown.Item>
        <Dropdown.Item onClick = {() => filtertask('status','in-progress')}>In-progress</Dropdown.Item>
        <Dropdown.Item onClick = {() => filtertask('status','assigned')}>Assigned</Dropdown.Item>
        <Dropdown.Item onClick = {() => filtertask('assigned_by', user.user.currentUser.id)}>Assigned by you</Dropdown.Item>
        <Dropdown.Item onClick = {() => filtertask('asigned_to', user.user.currentUser.id)}>Assigned to you</Dropdown.Item>


      
    </DropdownButton>
    </div>
</div>
<div className = "searching">
    {/* Searching */}
         <Form>
                <Form.Group controlId="search">
                  <Form.Control
                    type="search"
                    placeholder="Enter text to search"
                    onChange={(event) => handleInputChange(event)}
                    value={input}
                    autoComplete="off"
                  />
            </Form.Group>  
        </Form> 

</div>

        


        {/* List */}
        <table>
        <div className = "list">
        {loading && <p>...Loading</p>}
        {loading == false && task.Tasks.map((task) => (
            
        
        <Card key = {task.id}>
            <Card.Header>{task.id}</Card.Header>
            <Card.Body>   
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>
             <tr>   
             <td><p>{task.description}</p></td>
             <td> 
             {task.status == 'completed' && <p>Status: Completed</p>}
             {task.status == 'in-progress' && <p>Status: In-progress</p>}
             {task.status == 'deleted' && <p>Status: Deleted</p>}
             {task.status == 'assigned' && <p>Status: Assigned</p>}
             </td>
             <td><p>Due Date: {new Date(task.due_date).toDateString()}</p></td>
             <td><p>Created By: {task.assigned_by}</p></td>
             <td><p>Assigned To: {task.asigned_to}</p></td>





            <div style={{float: 'right'}}>
            
            {user.currentUser.user.id == task.assigned_by && task.status != 'deleted' && 
            <div>
                <input type = 'checkbox' onChange = {() => changeIds(task.id)}/><br/>     
                <Button variant="danger" onClick = {(event) => {handleDelete(event, task.id)}}>Delete</Button>
            </div>
            }



            {user.currentUser.user.id == task.assigned_by && task.status != 'deleted' && 
            <div>
            <Button variant="secondary" onClick = {() => showeditModal(task.id)}>Edit</Button>
            <Modal show={editmodalShow[task.id]}
        onHide = {() => closeeditModal(task.id)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Task Edit Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit = {(event) => {handleEdit(event, task.id)}}>
            <input type = 'title' placeholder = 'Title'/><br/>
            <input type = 'description' placeholder = 'Description'/><br/>
            <input type = 'date' placeholder = 'Due Date'/><br/>
            <Button variant="secondary" type = 'submit'>Edit</Button>
        </form>
      </Modal.Body>
        </Modal>
        </div>
            }




            {user.currentUser.user.id == task.asigned_to && task.status != 'deleted' && 
            <div>
            <Button variant="secondary" onClick = {() => showupdatemodalShow(task.id)}>Update</Button>
            <Modal show={updatemodalShow[task.id]}
        onHide = {() => closeupdatemodalShow(false)} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Task Update Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit = {(event) => {handleUpdate(event, task.id)}}>
            <input type = 'status' placeholder = 'Status'/><br/>
            <Button variant="secondary" type = 'submit'>Update</Button>
        </form>
      </Modal.Body>
        </Modal>
        </div>
            } 




            </div>
            </tr>
        </Card.Text>
        </Card.Body> 
        </Card>
        
        ))}
  





    
   
          </div> 


          </table> 
        </div>
    )
}




