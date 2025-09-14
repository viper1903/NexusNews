import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import HamburgerIcon from '../icons/HamburgerIcon';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  // Logout logic is no longer needed here
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Effect to close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">NewsPortal</Link>
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu-container" ref={dropdownRef}>
              <button
                className="hamburger-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <HamburgerIcon />
              </button>
              
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                  <Link to="/saved" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Saved Articles</Link>
                  <Link to="/history" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>History</Link>
                  {/* The logout button and divider have been removed */}
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link secondary-button">Login</Link>
              <Link to="/register" className="nav-link primary-button">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;