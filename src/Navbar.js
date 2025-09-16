import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import './Navbar.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="drawer-button" onClick={toggleDrawer}>
          ☰
        </button>
        <h1>Certificate System</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/generate" className="nav-link">Generate</Link>
        <Link to="/verify" className="nav-link">Verify</Link>
      </div>
      <SideDrawer isOpen={drawerOpen} onClose={toggleDrawer} />
    </nav>
  );
};

export default Navbar;