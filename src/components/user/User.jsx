import React, { useState } from 'react';
import { FaUser, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import EditProfileSheet from '../sidesheets/EditProfileSheet'; // Profile modal
import UpdatePasswordModal from '../sidesheets/ChangePasswordSheet'; // New password modal
import './User.css';

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
            <div className="dropdown-item" onClick={() => { 
              setShowProfileModal(true);
              setIsOpen(false); 
            }}>
              <FaUser className="option-icon" />
              <span>Profile</span>
            </div>
            <div className="dropdown-item" onClick={() => { 
              setShowPasswordModal(true);
              setIsOpen(false); 
            }}>
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

      {showProfileModal && <EditProfileSheet onClose={() => setShowProfileModal(false)} />}
      {showPasswordModal && <UpdatePasswordModal onClose={() => setShowPasswordModal(false)} />}
    </div>
  );
};

export default User;
