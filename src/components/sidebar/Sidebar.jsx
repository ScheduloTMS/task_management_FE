import React, { useState } from "react";
import { MdTask } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { TbLayoutSidebarLeftCollapse ,TbLayoutSidebarRightCollapse  } from "react-icons/tb";
import { RiCalendarScheduleFill } from "react-icons/ri";
import "./Sidebar.css";
import Logo from "../logo/Logo";


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
      <Logo size="small"/>
        
      </div>
      <nav className="sidebar-menu">
        <div className="sidebar-item" onClick={() => navigate("/")}>
          <GoHomeFill /> <span className="sidebar-text">Home</span>
        </div>
        <div className="sidebar-item" onClick={() => navigate("/tasks")}>
          <MdTask  /> <span className="sidebar-text">My Tasks</span>
        </div>
        <div className="sidebar-item" onClick={() => navigate("/messages")}>
          <AiFillMessage   /> <span className="sidebar-text">Messages</span>
        </div>
        <div className="sidebar-item" onClick={() => navigate("/calender")}>
        <RiCalendarScheduleFill /> <span className="sidebar-text">Calendar</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;