import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addTasks} from '../Reducer/taskSlice'
import {Accordion, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import { createTask, deleteTask, showtask, edittask, updatetask, searchTask, sorttask, filterTask, deleteTaskS } from '../Reducer/actions';
import Modal from 'react-bootstrap/Modal';
import { Chart } from "react-google-charts";
import { Form } from 'react-bootstrap';
import _ from 'lodash';



export default function AdminTask(){
    let task = useSelector(state => state.tasks);
    let user = useSelector(state => state.users);
    const [editmodalShow, seteditModalShow] = React.useState({});
    const [updatemodalShow, setupdateModalShow] = React.useState({});
    
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
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
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
        useEffect(() => {
          //Initialize debounce function to search once user has stopped typing every half second
          //This will run only once to intitialize, not on evry re render
          inputRef.current = _.debounce(onSearchTask, 500);
        }, []);
      
        
        const onSearchTask = (input) => {
            setLoading(true);
            let role = user.currentUser.user.role;
            let userID = user.currentUser.user.id;
            dispatch(searchTask(role, userID, input)).then(
                (response) => {
                    setLoading(false);
                }
            );
        
        };


        const deletebulktasks = (event)=>{
            event.preventDefault();
            setLoading(true);
            dispatch(deleteTaskS(user.currentUser.user.id, ids)).then(
                    dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id)),
                    setLoading(false),
            )
        }
      
        const handleInputChange = (event) => {
          const input = event.target.value;
          setInput(input);
          inputRef.current(input);
        };
    
    const dispatch = useDispatch();
    function handleSubmit(event){
        event.preventDefault();
        let role = user.currentUser.user.role;
        let userID = user.currentUser.user.id;
        dispatch(showtask(role, userID));
        
    }

    const [open, setOpen] = useState(false);


    function handleDelete(event, taskid){
        event.preventDefault();
        let userID = user.currentUser.user.id;
        dispatch(deleteTask(taskid, userID)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.role));
            }
        );
        
    }

    function handleCreate(event){
        event.preventDefault();
        let title = event.target[0].value;
        let description = event.target[1].value;
        let due_date = event.target[2].value;
        let asigned_to = event.target[3].value;
        let assigned_by = user.currentUser.user.id;

        let data = {
            params: {
                title, description, due_date, asigned_to, assigned_by
            }
        }
        dispatch(createTask(data)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.role));
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
        }
        dispatch(edittask(data, taskid)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id));
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
            dispatch(sorttask(sort, order, userID, role)).then(
                (response) => {
                    setSort("");
                    setOrder('None');
                    setLoading(false);
                }
            );
        }

    }
    const filtertask = (event) => {
        event.preventDefault();
        setLoading(true);
        let field = event.target[0].value;
        let value = event.target[1].value;
        let userID = user.currentUser.user.id;
        let role = user.currentUser.user.role;
        dispatch(filterTask(field, value, userID, role)).then(
        (response) => {
            setLoading(false);
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
        }
        dispatch(updatetask(taskid, data)).then(
            (response) => {
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id));
            }
        );
        
    }
    const data = [
        ["Status", "Number of tasks"],
        ["Completed", task.completedto],
        ["Assigned", task.assignedto],
        ["In progress", task.inprogressto],
      ];
      
    const options = {
        title: "Status of tasks assigned to you",
        is3D: true,
      };
      
      const data2 = [
        ["Status", "Number of tasks"],
        ["Completed", task.completedby],
        ["Assigned", task.assignedby],
        ["In progress", task.inprogressby],
      ];

      const options2 = {
        title: "Status of tasks assigned by you",
        is3D: true,
      };

    return (
        <div style={{}}>
        <Accordion>
        
        <Accordion.Item eventKey = "Show all tasks">
        <Accordion.Header onClick = {handleSubmit}>Show all Tasks</Accordion.Header>    

        <Accordion.Body>
        <Button variant="outline-danger" onClick = {(event) => {deletebulktasks(event)}}>Delete</Button>

        <div className = "sorting2">
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
        <div>
            <form onSubmit = {filtertask}>
                <input type = 'field' placeholder = 'Filter by'/>
                <input type = 'value' placeholder = 'Value'/>
                <button type = 'submit'>Filter</button>
            </form>
        </div>
        {loading && <p>...Loading</p>}
        {loading == false && task.Tasks.map((task) => (
            
        <Accordion key = {task.id}>
        <Accordion.Item eventKey= {JSON.stringify(task.id)}>
            <Accordion.Header>{task.id}</Accordion.Header>
            <Accordion.Body>   
            <div style={{float: 'right'}}>
            {user.currentUser.user.id == task.assigned_by && 
            <div>
            <input type = 'checkbox' onChange = {() => changeIds(task.id)}/><br/>     

            <Button variant="outline-danger" onClick = {(event) => {handleDelete(event, task.id)}}>Delete</Button>
            </div>
            }
            {user.currentUser.user.id == task.assigned_by && 
            <div>
            <Button variant="outline-secondary" onClick = {() => showeditModal(task.id)}>Edit</Button>
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
            <Button variant="outline-secondary" type = 'submit'>Edit</Button>
        </form>
      </Modal.Body>
        </Modal>
        </div>
            }
            {user.currentUser.user.id == task.asigned_to && 
            <div>
            <Button variant="outline-secondary" onClick = {() => showupdatemodalShow(task.id)}>Update</Button>
            <Modal show={updatemodalShow[task.id]}
        onHide = {() => closeupdatemodalShow(task.id)} size="lg"
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
            <Button variant="outline-secondary" type = 'submit'>Update</Button>
        </form>
      </Modal.Body>
        </Modal>
        </div>
            }
            </div>
       <div style={{clear: 'both'}}></div>
       <div>    
            <p>ID = {task.id}</p>
            <p>Title = {task.title}</p>
            <p>Description = {task.description}</p>
            <p>Created by = {task.assigned_by}</p>
            <p>Assigned to = {task.asigned_to}</p>
            <p>Status = {task.status}</p>
            <p>Due Date = {task.due_date}</p>
        </div>    
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        
        ))}
</Accordion.Body>        
</Accordion.Item>

<Accordion.Item eventKey = "createTask" >
<Accordion.Header>Create Task</Accordion.Header>
<Accordion.Body>
            <form onSubmit = {handleCreate}>
                <input type = 'title' placeholder = 'title'/><br/>
                <input type = 'description' placeholder = 'description' /><br/>
                <input type = 'date' placeholder = 'due date' /><br/>
                <input type = 'asigned_to' placeholder = 'assigned to' /><br/>
                <Button variant="outline-secondary" type = 'submit'>Create Task</Button>
            </form>
</Accordion.Body>
</Accordion.Item>


</Accordion>    


        </div>
    )
}





