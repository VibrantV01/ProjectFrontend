import './App.css';
import Register from './components/Register'
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage';
import DashBoard from './components/DashBoard';
import VerifyEmail from './components/VerifyEmail';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';




function App() {

 

  return (
    
    <div className="App">
      {/* <AppContainer/> */}
      <BrowserRouter>
      { <div className='col mt-3'>
    
      <Routes>

        <Route exact path = "/login" element = {<Login/>}/>
  
        <Route exact path = "/logout" element = {<Register />} /> 

        <Route exact path = "/register" element = {<Register />} />

        <Route exact path = "/" element = {<HomePage />} /> 

        <Route exact path = "/DashBoard" element = {<DashBoard />}/>

        <Route exact path = "/PasswordResetRequest" element = {<PasswordResetRequest />}/>
      

        <Route path = '*' element  = {
            <h1>This route doesn't exist, please check!</h1>
        } />

        <Route exact path = '/email/verify' element = {<VerifyEmail/>}/>

        <Route exact path = '/password/reset' element = {<PasswordReset/>}/>


      </Routes>  
      
      </div> } 
      </BrowserRouter>
    </div>
   
  );
}





export default App;
