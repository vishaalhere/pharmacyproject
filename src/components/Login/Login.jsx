import React, { Fragment, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const handleLogin = ()=>{
        if(username !=='' && username === password){
            alert('Login Successful')
            localStorage.setItem('loggedIn','secretKey');
            setIsAuthenticated(true);
            navigate('/');
        } else{
            alert(`Please Enter Valid Credentials ${username} ${password}`)
        }
    }
    return (
        <Fragment>
            <div className="login-container">
                <div className="login-box">
                    <p className='signin'>Sign In</p>
                    <input type="text" placeholder='Enter Username' onChange={(e)=> setUsername(e.target.value)}/>
                    <input type="text" placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)}/>
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Login