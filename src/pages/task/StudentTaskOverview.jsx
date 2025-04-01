import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TaskOverview from "../../components/task-overview/TaskOverview.jsx";
import Remarks from "../../components/remarks/Remarks.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";

import "./StudentTaskOverview.css"
const StudentTaskOverview = () => {
    return (
          <div className="Task-container">
        
       
          <Sidebar className="sidebar" />
  
    
            <div className="Topbar">
              <TopbarLayout />
            </div>


            <div className="Remarks">
              <Remarks />
            </div>


            <div className="TaskOverview">
              <TaskOverview />
            </div>
           
         
        
      </div>
    );
  };
  
  export default StudentTaskOverview;
  