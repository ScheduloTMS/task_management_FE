import React, { useState } from "react";
import { MdTask } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { RiCalendarScheduleFill } from "react-icons/ri";
import "./Sidebar.css";
import Logo from "../logo/Logo";

const Sidebar = ({ additionalItem }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  
  const menuItems = [
    { label: "Home", path: "/", icon: <GoHomeFill /> },
    { label: "My Tasks", path: "/tasks", icon: <MdTask /> },
    { label: "Messages", path: "/messages", icon: <AiFillMessage /> },
    { label: "Calendar", path: "/calender", icon: <RiCalendarScheduleFill /> },
  ];

  
  if (additionalItem) {
    menuItems.push(additionalItem);
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <Logo />
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <TbLayoutSidebarRightCollapse /> : <TbLayoutSidebarLeftCollapse />}
        </button>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div key={index} className="sidebar-item" onClick={() => navigate(item.path)}>
            {item.icon} <span className="sidebar-text">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
