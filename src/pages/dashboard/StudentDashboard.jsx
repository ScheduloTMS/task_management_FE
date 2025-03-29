import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Chart from "../../components/chart/Chart.jsx";
import Calendar from "../../components/calendar/Calendar.jsx";
import TaskCardLayout from "../../layouts/task-card-layout/TaskCardLayout.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Notepad from "../../components/notepad/Note.jsx";

import "./StudentDashboard.css"; 

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">                        
                                                  
      <Sidebar className="sidebar" />

      <div className="main-content">
        <TopbarLayout/>

      
          <div className="dashboard-grid">
          

          <div className="chart">
            <Chart />
          </div>

          
          <div className="calendar">
            <Calendar />
          </div>

         
            <TaskCardLayout />
          

          
          <div className="notepad">
            <Notepad />
          </div>


        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
