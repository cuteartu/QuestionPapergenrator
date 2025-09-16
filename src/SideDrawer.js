import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const SideDrawer = ({ isOpen, onClose }) => {
  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <Link to="/" className="drawer-link" onClick={onClose}>Home</Link>
      <Link to="/generate" className="drawer-link" onClick={onClose}>Generate</Link>
      <Link to="/verify" className="drawer-link" onClick={onClose}>Verify</Link>
    </div>
  );
};

export default SideDrawer;