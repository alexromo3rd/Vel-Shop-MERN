import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <nav id='navbar'>
      <h2>
        <Link to='/'>Vel The Wonder</Link>
      </h2>
      <ul>
        <li>
          <Link to='#'>Home</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
          <Link to='#'>Login</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li>
          <Link to='#'>Cart (0)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
