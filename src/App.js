import { Fragment, useContext, useEffect } from 'react';
import './reset.css'
import './variables.css';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Orders from './components/OrdersPage/Orders';
import Products from './components/ProductsPage/Products';
import Users from './components/UsersPage/Users';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login/Login';

function App() {
  const { authenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const isLoggedIn = (localStorage.getItem('loggedIn'));
    if (isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false)
    }
  }, [authenticated])
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          {authenticated && <Route exact path='/' element={<Orders />} />}
          {authenticated && <Route exact path='/products' element={<Products />} />}
          {authenticated && <Route exact path='/users' element={<Users />} />}
          {authenticated === false && <Route exact path='/login' element={<Login />} />}
          {authenticated === false && <Route path="*" element={<Navigate replace to="/login" />} />}
          {authenticated && <Route path="*" element={<Navigate replace to="/" />} />}
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
