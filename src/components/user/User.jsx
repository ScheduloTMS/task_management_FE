import React, { useState, useEffect } from 'react';
import { FaUser, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import EditProfileSheet from '../sidesheets/EditProfileSheet'; 
import UpdatePasswordModal from '../sidesheets/ChangePasswordSheet'; 
import './User.css';
import { useRecoilValue } from 'recoil';
import { authState } from '../../states/authState.jsx';

const User = () => {
  const auth = useRecoilValue(authState);
  const { name, photo } = auth;
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [localPhoto, setLocalPhoto] = useState("");

  useEffect(() => {
    const cleaned = photo?.split('#')[0];
    setLocalPhoto(cleaned);
  }, [photo]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile">
      <div className="user-initial-view" onClick={toggleDropdown}>
        {localPhoto ? (
          <img
            key={photo} // still good to keep
            src={`data:image/png;base64,${localPhoto}`}
            alt="User"
            className="user-avatar"
          />
        ) : (
          <div className="user-fallback-avatar">{firstLetter}</div>
        )}

        <div className="name-dropdown">
          <span className="user-name">{name}</span>
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
