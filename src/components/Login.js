import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {login} from '../Reducer/userSlice';
import {useDispatch} from 'react-redux';
import {LogiN} from '../Reducer/actions';
import {useSelector} from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";
import Alert from 'react-bootstrap/Alert';


 
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(false);
    const [HUMAN, setHUMAN] = React.useState(false);
    const user = useSelector(state => state.users);
    function handleClick(event) {
        event.preventDefault();
        let email = event.target[0].value;
        let password = event.target[1].value;
        let data = {
            email, password
        }
        dispatch(LogiN(data)).then((res)=>{
            console.log(res);
            navigate('/Dashboard', {replace: true})
        }
        );
        // axios.post('http://localhost:8002/api/login', data).then (
        //     (response) => {
        //         if (response && response.data.access_token){
        //             dispatch(login(response.data));
        //             localStorage.setItem('user', JSON.stringify(response.data));
        //             navigate('/Dashboard', {replace: true});
        //         }
        //     }, 
        //     (error) => {
        //         console.log(error);
        //     }
        // )

        

    }

    
    return  (
            <div>
                <form className="login" onSubmit = {handleClick}>
                    <div>Login</div><br/>
                    <input type = 'email' placeholder = 'Email'  /><br/>
                    <input type = 'password' placeholder = 'Password'  /><br/><br/>
                    <div className = 'captcha2'>
                    <ReCAPTCHA sitekey = {"6LdaqN0hAAAAAKY6EhiBeHHgaZ0DEQkOcBEn9VCH"  } onChange = {() => setHUMAN(true)} /><br/>
                </div>
                <Alert variant="danger" show = {show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Captcha verification failed
        </p>
      </Alert>
                    <button onSubmit = {handleClick}>Login</button><br/>
                    <h4>Don't have an account?</h4><br/>
                    <Link to = '/register'>Register</Link>
                </form>
            </div>
    )
    
}
export default Login;

