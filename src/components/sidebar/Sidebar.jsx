import React from "react";
import { MdTask } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { RiCalendarScheduleFill } from "react-icons/ri";
import "./Sidebar.css";
import Logo from "../logo/Logo";

const Sidebar = ({ additionalItem }) => {
  const navigate = (path) => {
    window.location.href = path;
  };

  const menuItems = [
    { icon: <GoHomeFill />, text: "Home", path: "/" },
    { icon: <MdTask />, text: "My Tasks", path: "/tasks" },
    { icon: <AiFillMessage />, text: "Messages", path: "/messages" },
    { icon: <RiCalendarScheduleFill />, text: "Calendar", path: "/calendar" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo size="small" />
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="sidebar-item" 
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="sidebar-text">{item.text}</span>
          </div>
        ))}
        {additionalItem && (
          <div 
            className="sidebar-item" 
            onClick={() => navigate(additionalItem.path)}
          >
            {additionalItem.icon}
            <span className="sidebar-text">{additionalItem.label}</span>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;