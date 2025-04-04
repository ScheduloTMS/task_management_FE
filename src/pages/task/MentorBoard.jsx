import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import KanbanBoard from "../../components/kanbanboard/KanbanBoard.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import BoardListButtons from "../../components/button/BoardListButtons.jsx";  
import "./MentorBoard.css";

const MentorBoard = () => {
  const [viewMode, setViewMode] = useState("kanban"); 

  useEffect(() => {
    
  }, []);

  return (
    <div className="mentor-board-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      <div className="main-content">
        <div>
          <TopbarLayout />
        </div>

        <div className="content-wrapper">
          <div className="board-list-buttons">
            <BoardListButtons setViewMode={setViewMode} /> 
          </div>
          
          <div >
            {viewMode === "kanban" ? (
              <KanbanBoard isMentor={true} />
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