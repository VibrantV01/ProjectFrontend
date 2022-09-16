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



export default function TempTasks(){
    let task = useSelector(state => state.tasks);
    let user = useSelector(state => state.users);
    const [editmodalShow, seteditModalShow] = React.useState({});
    const [updatemodalShow, setupdateModalShow] = React.useState({});
    const [ids, setIds] = React.useState([]);
    const [tasks, setTasks] = React.useState('show');
    const [fields, setFields] = useState('');
    const [values, setValues] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const inputRef = useRef();
    const [open, setOpen] = useState(false);
    const [order, setOrder] = React.useState('None');
    const [sort, setSort] = React.useState("");
    const [showcreate, setShowcreate] = React.useState(false);


    function clickNext(){
        setLoading(true);

        if (tasks == 'show'){
            dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, task.currentPage + 1)).then(
                setLoading(false)
            );
        } else if (tasks == 'search'){
            dispatch(searchTask(user.currenUser.user.role, user.currentUser.user.id, input, user.currentUser.access_token, task.currentPage - 1)).then(
                setLoading(false)
            );
        } else if (tasks == 'filter'){
            dispatch(filterTask(fields, values,user.currentUser.user.id, user.currentUser.user.role, user.currentUser.access_token, task.currentPage + 1)).then(
                setLoading(false)
            );
        } else if (tasks == 'sort') {
            dispatch(sorttask(sort, order, user.currentUser.user.id, user.currentUser.user.role, user.currentUser.access_token, task.currentPage + 1)).then(
                (response) => {
                    setSort("");
                    setOrder('None');
                    setLoading(false);
                }
            );
        }
    }
    function clickPrev(){
        setLoading(true);
        if (task.currentPage > 1){
            if (tasks == 'show'){
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, task.currentPage - 1)).then(
                    setLoading(false)
                );
            } else if (tasks == 'search'){
                dispatch(searchTask(user.currenUser.user.role, user.currentUser.user.id, input, user.currentUser.access_token, task.currentPage - 1)).then(
                    setLoading(false)
                );
            } else if (tasks == 'filter'){
                dispatch(filterTask(fields, values, user.currentUser.user.id, user.currentUser.user.role, user.currentUser.access_token, task.currentPage - 1)).then(
                    setLoading(false)
                );
            } else if (tasks == 'sort') {
                dispatch(sorttask(sort, order, user.currentUser.user.id, user.currentUser.user.role, user.currentUser.access_token, task.currentPage - 1)).then(
                    (response) => {
                        setSort("");
                        setOrder('None');
                        setLoading(false);
                    }
                );
            }
        }
    }

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

    

    const deletebulktasks = (event)=>{
        event.preventDefault();
        setLoading(true);
        dispatch(deleteTaskS(user.currentUser.user.id, ids, user.currentUser.access_token)).then(
            (response) => {
            setLoading(true);
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, 1)).then(
                    dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token)).then(
                        (response) => {
                            console.log(response);
                            setLoading(false);
                        }
                    )
                    );

                    }
        )
    }

    
      
        useEffect(() => {
          //Initialize debounce function to search once user has stopped typing every half second
          //This will run only once to intitialize, not on evry re render
          inputRef.current = _.debounce(onSearchTask, 500);
        }, []);
      
        
        const onSearchTask = (input) => {
            setLoading(true);
            setTasks('search');
            let role = user.currentUser.user.role;
            let userID = user.currentUser.user.id;
            dispatch(searchTask(role, userID, input, user.currentUser.access_token, 1)).then(
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
        setTasks('show');
        let role = user.currentUser.user.role;
        let userID = user.currentUser.user.id;
        dispatch(showtask(role, userID, user.currentUser.access_token, 1));
        
    }

   


    function handleDelete(event, taskid){
        event.preventDefault();
        let userID = user.currentUser.user.id;
        dispatch(deleteTask(taskid, userID, user.currentUser.access_token)).then(
            (response) => {
                setLoading(true);
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, 1)).then(
                dispatch(createStats(user.currentUser.user.id, user.currentUser.access_token)).then(
                    (response) => {
                        setLoading(false);
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

    
    
    function sortTask(event){
        event.preventDefault();
        setLoading(true);
        setTasks('sort');
        let userID = user.currentUser.user.id;
        let role = user.currentUser.user.role;
        if (order != 'None' && sort != ""){
            dispatch(sorttask(sort, order, userID, role, user.currentUser.access_token, 1)).then(
                (response) => {
                    setLoading(false);
                }
            );
        }

    }
    const filtertask = (field, value) => {
        // event.preventDefault();
        setLoading(true);
        setTasks('filter');
        // let field = event.target[0].value;
        // let value = event.target[1].value;
        let userID = user.currentUser.user.id;
        let role = user.currentUser.user.role;
        field = field.toLowerCase();
        value = value.toLowerCase();
        setFields(field);
        setValues(value);
        if (field == 'assigned to'){
            field = 'asigned_to';
        }
        if (field == 'created by'){
            field = 'assigned_by';
        }
        console.log(field);
        console.log(value);
        dispatch(filterTask(field, value, userID, role, user.currentUser.access_token, 1)).then(
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
                dispatch(showtask(user.currentUser.user.role, user.currentUser.user.id, user.currentUser.access_token, 1));
                
            }
        );
        
    }

    



      

    return (


        
        <div style={{}}>







{/* Bulk Delete Button */}
        <Button variant="danger" onClick = {(event) => {deletebulktasks(event)}}>Delete</Button>



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
        <Dropdown.Item onClick = {() => filtertask('assigned_by', user.currentUser.user.id.toString())}>Assigned by you</Dropdown.Item>
        <Dropdown.Item onClick = {() => filtertask('asigned_to', user.currentUser.user.id.toString())}>Assigned to you</Dropdown.Item>


      
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
        <table className='table'>
        <tr>
        <th>Select</th>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Creator</th>
            <th>Assigned to</th>
            
            <th>Delete</th>
            <th>Edit</th>
            <th>Update</th>
            </tr>
        {loading && <p>...Loading</p>}    
        {loading == false && task.Tasks.length == 0 && <p style = {{justifyContent: 'center'}}>No data to show</p>}
        {loading == false && task.Tasks.map((task) => (
            
        
        
            <tr>
                {user.currentUser.user.id == task.assigned_by && task.status != 'deleted' && 
            
            <td style={{marginRight:'3px'}}><input type = 'checkbox' onChange = {() => changeIds(task.id)}/></td>    
            
        
        }
        {(user.currentUser.user.id != task.assigned_by || task.status == 'deleted') && 
        
            <td style={{marginRight:'3px'}}><input type = 'checkbox'/></td>    
            
        
        }

            <td>{task.id}</td>  
            <td>{task.title}</td>
            
            
            
            
             <td><p>{task.description}</p></td>
             
             <td>
             {task.status == 'completed' && <p>Completed</p>}
             {task.status == 'in-progress' && <p>In-progress</p>}
             {task.status == 'deleted' && <p>Deleted</p>}
             {task.status == 'assigned' && <p>Assigned</p>}</td>
             <td><p>{new Date(task.due_date).toDateString()}</p></td>
             <td><p>{task.assigned_by_name}</p></td>
             <td><p>{task.asigned_to_name}</p></td>




            
            {user.currentUser.user.id == task.assigned_by && task.status != 'deleted' && 
            
                 
                <td><Button variant="danger" style={{backgroundColor:'#FF3F00' ,color:'FFFFFF'}} onClick = {(event) => {handleDelete(event, task.id)}}>Delete</Button></td>
            
            }
            {(user.currentUser.user.id != task.assigned_by || task.status == 'deleted') && 
            
                   
                <td><Button variant="danger"  disabled>Delete</Button></td>
            
            }



            {user.currentUser.user.id == task.assigned_by && task.status != 'deleted' && 
            <td><Button variant="secondary" style={{backgroundColor:'#0000FF' ,color:'FFFFFF'}} onClick = {() => showeditModal(task.id)}>Edit</Button></td>
            
            }
            {(user.currentUser.user.id != task.assigned_by || task.status == 'deleted') && 
                <td><Button variant="secondary" disabled>Edit</Button></td>
            }




            {user.currentUser.user.id == task.asigned_to && task.status != 'deleted' && 
           
            <td><Button variant="secondary" style={{backgroundColor:'#0000FF' ,color:'FFFFFF'}} onClick = {() => showupdatemodalShow(task.id)}>Update</Button></td>
            
       
            } 

            {(user.currentUser.user.id != task.asigned_to || task.status == 'deleted') && 
                <td><Button variant="secondary" disabled>Update</Button></td>
            }

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
            <Button variant="secondary" type = 'submit'>Update</Button>
        </form>
      </Modal.Body>
        </Modal>


            </tr>
        
        
        ))}
  





    
            
          
          </table>

          {task.currentPage > 1 && <Button style = {{marginRight: '20px'}} onClick = {(event) => {clickPrev(event)}}>Previous</Button>} {task.currentPage} {task.currentPage < task.lastPage && <Button style = {{marginLeft: '20px'}} onClick = {(event) => {clickNext(event)}}>Next</Button>}

        </div>
    )
}




