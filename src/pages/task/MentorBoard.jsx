import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import KanbanBoard from "../../components/kanbanboard/KanbanBoard.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import BoardListButtons from "../../components/button/BoardListButtons.jsx";  
import "./MentorBoard.css";
import { IoPeople } from "react-icons/io5";

const MentorBoard = () => {
  const [viewMode, setViewMode] = useState("kanban"); 
  const additionalMenuItem = { label: "Team", path: "/team", icon: <IoPeople /> };
  const handleEditTask = (taskId) => {
    console.log("Edit task:", taskId);
    // Your edit logic here
  };
  
  const handleDeleteTask = (taskId) => {
    console.log("Delete task:", taskId);
  };
  useEffect(() => {
    
  }, []);

  return (
    <div className="mentor-board-container">
      <div className="main-content">

        <div className="content-wrapper">
          
          <div  className="board-content">
            {viewMode === "kanban" ? (
              <KanbanBoard 
              isMentor={true}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            ) : (
              <div className="list-view"> 
                <h2>List View</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorBoard;