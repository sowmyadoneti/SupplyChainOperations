import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, isLoggedIn } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  console.log("ROLE FROM TOKEN:", getRole());
  const role = getRole();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f0f0f0' }}>
      {isLoggedIn() && <Link to="/inventory">Inventory</Link>}
      {isLoggedIn() && <Link to="/orders">Orders</Link>}
      {role === 'STAFF' && <Link to="/place-order">Place Order</Link>}
      {!isLoggedIn() && <Link to="/login">Login</Link>}
      {!isLoggedIn() && <Link to="/register">Register</Link>}
      {isLoggedIn() && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
