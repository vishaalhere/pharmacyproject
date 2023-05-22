import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.setItem('loggedIn', '')
        navigate('/login')
    }
    return (
        <div className='navbar-container'>
            <div className='nav-logo-routes-container'>
                <img className='nav-logo' src="./LogoMain.png" alt="" />
                <span className='nav-heading'>Ram Pharmacy</span>
                <div className='nav-routes-container'>
                    <Link to='/' className={`route ${location.pathname === '/' && 'selected'}`}>Orders</Link>
                    <Link to='/products' className={`route ${location.pathname === '/products' && 'selected'}`}>Products</Link>
                    <Link to='/users' className={`route ${location.pathname === '/users' && 'selected'}`}>Users</Link>
                </div>
            </div>
            {authenticated && <p className='logout' onClick={handleLogout}>
                Logout
            </p>}
        </div>
    )
}

export default Navbar