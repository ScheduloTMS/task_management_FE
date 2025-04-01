import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Chart from "../../components/chart/Chart.jsx";
import CalendarNotesLayout from "../../layouts/calendarnotes-layout/CalendarNotesLayout.jsx";
import TaskCardLayout from "../../layouts/task-card-layout/TaskCardLayout.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";

import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      
      
      <Sidebar className="sidebar" />

      <div className="main-content">

        <TopbarLayout />

        <div className="dashboard-content">

          <div className="dashboard-box chart">
            <Chart />
          </div>


          <div className="dashboard-box task-card">
            <h4 className="dashboard-main-heading">Task Board</h4>
            <TaskCardLayout />
          </div>

          
          <div className="dashboard-box calendar-notes">
            <CalendarNotesLayout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
