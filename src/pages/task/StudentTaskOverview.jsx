import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TaskOverview from "../../components/task-overview/TaskOverview.jsx";
import Remarks from "../../components/remarks/Remarks.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Uploads from "../../components/uploads/Uploads.jsx";
import "./StudentTaskOverview.css";

const StudentTaskOverview = () => {
  const [taskTitle, setTaskTitle] = useState("Loading...");

  useEffect(() => {
    
    setTimeout(() => {
      setTaskTitle("Complete the Frontend"); 
    }, 2000);
  }, []);

  return (
    <div className="student-task-overview-container">
      
      <div className="sidebar-container">
        <Sidebar />
      </div>


      <div className="main-content">

        <div>
          <TopbarLayout />
        </div>


        <div className="task-title">{taskTitle}</div>

        
        <div className="content-wrapper">

          <div className="left-column">
            <div >
              <TaskOverview />
            </div>
            <div className="uploads-container">
              <Uploads />
            </div>
          </div>

          
          <div className="remarks-container">
            <Remarks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTaskOverview;
