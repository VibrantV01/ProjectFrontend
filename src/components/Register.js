import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {create} from '../Reducer/actions';
import ReCAPTCHA from "react-google-recaptcha";
import Alert from 'react-bootstrap/Alert';





function Register () {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const [HUMAN, setHUMAN] = React.useState(false);
    function handleClick(event){
        event.preventDefault();
        let name = event.target[0].value;
        let email = event.target[1].value;
        let password = event.target[2].value;
        let data = {
            name, email, password
        };
        if (HUMAN == true){
            dispatch(create(data)).then(
                navigate('/Login', {replace: true})
            );
        } else {
            setShow(true);
        }
        
    }

    
        return (
            <div className = "Register">
            <form className="register" onSubmit = {handleClick}>
                <div>Register</div><br/>
                <input type = 'name' placeholder = 'Name' /><br/>
                <input type = 'email' placeholder = 'Email'  /><br/>
                <input type = 'password' placeholder = 'Password'  /><br/><br/>
                <div className = "captcha">
                <ReCAPTCHA sitekey = {"6LdaqN0hAAAAAKY6EhiBeHHgaZ0DEQkOcBEn9VCH"  } onChange = {() => setHUMAN(true)} /><br/>
                </div>
                <Alert variant="danger" show = {show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Captcha verification failed
        </p>
      </Alert>
                <button type ='submit'>Register</button>
                <br/>
                <h4>Already have an account?</h4>
                <Link to = "/login">Login</Link>
            </form>
            </div>
        )
    
}
export default Register;