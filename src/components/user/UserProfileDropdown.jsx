import React from "react";
import { FaUser, FaLock, FaSignOutAlt } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "./User.css"; 

const UserDropdown = ({ userName = "Jane Joseph" }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-toggle-custom"
    >
      <div className="user-avatar">
        {userName.charAt(0)}
      </div>
      <span className="user-name">{userName}</span>
      {children}
    </div>
  ));

  return (
    <Dropdown className="user-dropdown-container">
      <Dropdown.Toggle as={CustomToggle}>
        <svg
          className="dropdown-arrow"
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#666"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-custom">
        <Dropdown.Item className="menu-item">
          <FaUser className="menu-icon" />
          <span>Profile</span>
        </Dropdown.Item>
        <Dropdown.Item className="menu-item">
          <FaLock className="menu-icon" />
          <span>Change Password</span>
        </Dropdown.Item>
        <Dropdown.Divider className="menu-divider" />
        <Dropdown.Item className="menu-item logout">
          <FaSignOutAlt className="menu-icon" />
          <span>Logout</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;