import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Chart from "../../components/chart/Chart";
import TaskCardLayout from "../../layouts/task-card-layout/TaskCardLayout";
import CalendarNotesLayout from "../../layouts/calendarnotes-layout/CalendarNotesLayout";
import Graph from "../../components/graph/Graph.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";
import { useNavigate } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import "./Dashboard.css";

const Dashboard = () => {
   
  const { role, isFirstLogin } = useRecoilValue(authState); 
  const navigate = useNavigate();  

  useEffect(() => {
    if (isFirstLogin) {
      
      navigate("/change-password");
    }
  }, [isFirstLogin, navigate]);

  
  const additionalMenuItem = { label: "Team", path: "/team", icon: <IoPeople /> };

  return (
    <div className="dashboard-container">
      <Sidebar className="sidebar" />

      <div className="main-content">
        <TopbarLayout />
        <h2>Welcome Jaimie!</h2>
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

export default Dashboard;
