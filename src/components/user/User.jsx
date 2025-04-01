import React, { useState } from 'react';
import { FaUser, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { MdArrowDropDown,MdArrowDropUp } from "react-icons/md";
import './User.css';

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState({
    name: 'Jaimie Miller',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile">
      <div className="user-initial-view" onClick={toggleDropdown}>
        <img src={user.photo} alt="User" className="user-avatar" />
        <div className="name-dropdown">
          <span className="user-name">{user.name}</span>
          {isOpen ? <MdArrowDropUp className="dropdown-icon" /> : <MdArrowDropDown className="dropdown-icon" />}
        </div>
      </div>

      {isOpen && (
        <div className="user-dropdown">
          
           
          <div className="dropdown-options">
            <div className="dropdown-item">
              <FaUser className="option-icon" />
              <span>Profile</span>
            </div>
            <div className="dropdown-item">
              <FaKey className="option-icon" />
              <span>Change Password</span>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-item logout">
              <FaSignOutAlt className="option-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
