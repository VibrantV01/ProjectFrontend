import React from 'react';
import {Link} from 'react-router-dom';
import PasswordResetRequest from './PasswordResetRequest';




function HomePage() {
    
    
        return (
            <div className = "HomePage">
            <nav>
                <Link to = '/login'  style={{ textDecoration: 'none' }}>Login</Link> | {' '}
                <Link to = '/register'   style={{ textDecoration: 'none' }}>Register</Link> | {' '}
                <Link to = '/PasswordResetRequest'   style={{ textDecoration: 'none' }}>Forgot Password?</Link>
            </nav>
            <h1>Welcome!</h1>
            </div>
        )
    
}


export default HomePage;
