import React, { useState } from 'react';
import './UserProfileDropdown.css';
import avatarSrc from "../../assets/Shape.png";

const UserProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  

  return (
    <div className={`user-profile-wrapper ${isOpen ? 'active' : ''}`}>
      <div className="user-profile" onClick={toggleDropdown}>
        <div className="avatar-container">
          <img src={avatarSrc} alt="User Avatar" className="avatar" />
        </div>
        <div className="username">{user.name}</div>
        <div className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <a href="#profile">Profile</a>
            </li>
            <li>
              <a href="#change-password">Change Password</a>
            </li>
            <li>
              <a href="#logout">Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;