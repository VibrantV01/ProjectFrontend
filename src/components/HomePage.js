import React from 'react';
import {Link} from 'react-router-dom';
import PasswordResetRequest from './PasswordResetRequest';




function HomePage() {
    
        return (
            <div>
            <nav>
                <Link to = '/login'>Login</Link> | {' '}
                <Link to = '/register'>Register</Link> | {' '}
                <Link to = '/PasswordResetRequest'>Forgot Password?</Link>
            </nav>
            <h1>Welcome!</h1>
            </div>
        )
    
}


export default HomePage;
