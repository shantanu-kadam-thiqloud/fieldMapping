import React from 'react';
import logo from './../assets/images/Kotak_logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo">
       <a href='/'> <img src={logo} alt="Logo" className="headerLogo"/></a>
      <Link to="/fieldMapping"><button className='demoMenu'>Field Mapping</button></Link>
      </div>      
    </header>
  );
}

export default Header;