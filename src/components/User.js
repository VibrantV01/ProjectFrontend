import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Chart } from "react-google-charts";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'


export default function User(){
    const task = useSelector(state => state.tasks);
    const user = useSelector(state=>state.users);

    const { id } = useParams()
    const [stats, setStats] = React.useState([]);
    useEffect(() => {
        let data = {
            params: {
                id: id
            },
            headers: {
                Authorization: 'Bearer' + user.currentUser.access_token
            }
        }
        axios.get('http://localhost:8002/stats', data).then(
            (response) => {
                setStats(response.data);
                console.log(stats);
                console.log(stats['completed']);
                console.log(stats['in-progress']);
                console.log(stats['assigned']);
            }
        );

    }, []);


    const data = [
        ["Status", "Number of tasks"],
        ["Completed", stats['completed']],
        ["Assigned", stats['assigned']],
        ["In progress", stats['in-progress']],
      ];
      
    const options = {
        title: "Status of tasks assigned to this user",
        is3D: true,
        legend:{position: 'right'},

      };


      


      return (
        <div>
        <h1>Hey {user.currentUser.user.name}! </h1>
        <h2>Welcome to {id}'s DashBoard</h2>
        {stats['completed'] == 0 && stats['assigned'] == 0 && stats['in-progress'] == 0 && <p>No Tasks assigned to this {user.users[id].name}</p>}
        {(stats['completed'] != 0 || stats['assigned'] != 0 || stats['in-progress'] != 0) &&
        <div className = 'chart1'>    
            <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      loader={<div>Loading Chart</div>}
      height={"400px"}
        />
        </div>
    }

        </div>
      )
}