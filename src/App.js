import './App.css';
import Register from './components/Register'
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import useEffect from 'react';
import HomePage from './components/HomePage';
import DashBoard from './components/DashBoard';
import VerifyEmail from './components/VerifyEmail';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import UserPage from './components/UserPage';
import Users from './components/Users';
import Tasks from './components/Tasks';
import UsersAdmin from './components/UsersAdmin';
import Home from './components/Home';
import User from './components/User';
import TempTasks from './components/TempTasks';
import TempUser from './components/TempUser';
import TempUserAdmin from './components/TempUserAdmin';
import Profile from './components/Profile';

function App() {

  
 

  return (
    
    <div className="App">
      {/* <AppContainer/> */}
      <BrowserRouter>
      { <div className='col mt-3'>
    
      <Routes>

        <Route path = "/login" element = {<Login/>}/>
  
        <Route path = "/logout" element = {<Register />} /> 

        <Route path = "/register" element = {<Register />} />

        <Route path = "/" element = {<HomePage />} /> 

        <Route path = "/DashBoard" element = {<DashBoard />}/>

        <Route path = "/PasswordResetRequest" element = {<PasswordResetRequest />}/>
      
        <Route path="UserPage" element={<UserPage />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Users" element={<TempUser />} />
          <Route path="UsersAdmin" element = {<TempUserAdmin/>} />
          <Route path="Tasks" element = {<TempTasks/>}/>
          <Route path="/UserPage/user/:id" element = {<User/>}/>
          <Route path = "Profile" element = {<Profile/>}/>
        </Route>
        <Route path = '*' element  = {
            <h1>This route doesn't exist, please check!</h1>
        } />

        <Route path = '/email/verify' element = {<VerifyEmail/>}/>

        <Route path = '/password/reset' element = {<PasswordReset/>}/>
        

      </Routes>  
      
      </div> } 
      </BrowserRouter>
    </div>
   
  );
}





export default App;
