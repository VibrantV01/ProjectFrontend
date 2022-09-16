import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Chart } from "react-google-charts";


export default function Home(){
    const task = useSelector(state => state.tasks);
    const user = useSelector(state=>state.users);
    const data = [
        ["Status", "Number of tasks"],
        ["Completed", task.completedto],
        ["Assigned", task.assignedto],
        ["In progress", task.inprogressto],
      ];
      
    const options = {
        title: "Status of tasks assigned to you",
        is3D: true,
        legend:{position: 'right'},

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
        legend:{position: 'left'},

      };


      


      return (
        <div>
        <h1>Hey {user.currentUser.user.name}! </h1>
        <h2>Welcome to yourDashboard</h2>
        {(task.completedto != 0 ||task.assignedto != 0 || task.inprogressto != 0) && 
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
    {(task.completedby != 0 || task.assignedby != 0 || task.inprogressby != 0) && 
        <div className = 'chart2'>
         <Chart
      chartType="PieChart"
      data={data2}
      options={options2}
      width={"100%"}
      loader={<div>Loading Chart</div>}
      height={"400px"}
      />
        </div>
}
        </div>
      )
}