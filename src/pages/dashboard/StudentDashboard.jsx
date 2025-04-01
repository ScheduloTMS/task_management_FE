import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Chart from "../../components/chart/Chart.jsx";
import CalendarNotesLayout from "../../layouts/calendarnotes-layout/CalendarNotesLayout.jsx";
import TaskCardLayout from "../../layouts/task-card-layout/TaskCardLayout.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Graph from '../../components/graph/Graph.jsx';

import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar className="sidebar" />

      <div className="main-content">
        <TopbarLayout />

        <div className="dashboard-content">
          <div className="chart-graph">
            <div className="dashboard-box chart">
              <Chart />
              <Graph/>
            </div>   
          </div>

          <div className="dashboard-box task-card">
            <h5 className="dashboard-main-heading">Task Board</h5>
            <TaskCardLayout />
          </div>

          <div className="dashboard-box calendarnote">
            <CalendarNotesLayout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
