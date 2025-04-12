// File: src/components/Navbar.jsx
import React, { useState } from 'react';
import './navbar.css'; // You'll need to create this CSS file
import { Typography } from '@mui/material';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
    <div className="navbar-container">
      <a href="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', color: 'inherit' }}>
          PlanFit
        </Typography>
      </a>
        
        {/* Mobile menu button */}
        <div className="mobile-menu-button" onClick={toggleMenu}>
          <span className={`menu-icon ${menuOpen ? 'open' : ''}`}></span>
        </div>
        
        <div className={`navbar-content ${menuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/features" className="nav-link">Features</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>
          
          <a href="/dashboard" className="dashboard-button">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;