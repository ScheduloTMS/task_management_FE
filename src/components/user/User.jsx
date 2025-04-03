import React, { useState } from 'react';
import { FaUser, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../states/authState"; 
import { logoutUser } from "../../services/authService"; 
import EditProfileSheet from '../sidesheets/EditProfileSheet';
import UpdatePasswordModal from '../sidesheets/ChangePasswordSheet';
import './User.css';

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);  
  const auth = useRecoilValue(authState); // Get auth state for token

  const [user] = useState({
    name: 'Jaimie Miller',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setError(""); // Clear previous errors
    setLoading(true);
  
    try {
      if (!auth.token) {
        throw new Error("No token available. Redirecting to login.");
      }
  
      const response = await logoutUser(auth.token); // Call API
      console.log("Logout API Response:", response);
  
      if (response && response.status === "success") {
        localStorage.removeItem("token"); // Clear token from storage
        setAuth({ token: null, isFirstLogin: false }); // Clear state
        navigate("/login"); // Redirect to login
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (err) {
      console.error("Logout Failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            
            <div className="dropdown-item logout" onClick={handleLogout}>
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
