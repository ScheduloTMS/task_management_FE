import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState"; 

import { MdTask } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";

import Logo from "../logo/Logo";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ Added this line
  const location = useLocation();
  const role = useRecoilValue(authState)?.role;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo size="small" />
      </div>

      <nav className="sidebar-menu">
        <div
          className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <GoHomeFill />
          <span className="sidebar-text">Home</span>
        </div>

        <div
          className={`sidebar-item ${isActive("/task") ? "active" : ""}`}
          onClick={() => navigate("/task")}
        >
          <MdTask />
          <span className="sidebar-text">My Tasks</span>
        </div>

        {role === "MENTOR" && (
          <div
            className={`sidebar-item ${isActive("/team") ? "active" : ""}`}
            onClick={() => navigate("/team")}
          >
            <IoPeople />
            <span className="sidebar-text">Team</span>
          </div>
        )}

        <div
          className={`sidebar-item ${isActive("/messages") ? "active" : ""}`}
          onClick={() => navigate("/messages")}
        >
          <AiFillMessage />
          <span className="sidebar-text">Messages</span>
        </div>

        <div
          className={`sidebar-item ${isActive("/calendar") ? "active" : ""}`}
          onClick={() => navigate("/calendar")}
        >
          <RiCalendarScheduleFill />
          <span className="sidebar-text">Calendar</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
