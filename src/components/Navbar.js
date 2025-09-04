import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">StorySprout</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/create" className="nav-links">Create Story</a>
          </li>
          <li className="nav-item">
            <a href="/library" className="nav-links">My Library</a>
          </li>
          <li className="nav-item">
            <a href="/profile" className="nav-links">Profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;