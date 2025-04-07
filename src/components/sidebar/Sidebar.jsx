import React from "react";
import { MdTask } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import "./Sidebar.css";
import Logo from "../logo/Logo";

const Sidebar = ({ role }) => {
  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo size="small" />
      </div>

      <nav className="sidebar-menu">
        <div className="sidebar-item" onClick={() => navigate("/")}>
          <GoHomeFill /> <span className="sidebar-text">Home</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/tasks")}>
          <MdTask /> <span className="sidebar-text">My Tasks</span>
        </div>

        {role === "MENTOR" && (
          <div className="sidebar-item" onClick={() => navigate("/team")}>
            <IoPeople /> <span className="sidebar-text">Team</span>
          </div>
        )}

        <div className="sidebar-item" onClick={() => navigate("/messages")}>
          <AiFillMessage /> <span className="sidebar-text">Messages</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/calendar")}>
          <RiCalendarScheduleFill /> <span className="sidebar-text">Calendar</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;