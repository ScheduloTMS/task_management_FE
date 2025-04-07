import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import KanbanBoard from "../../components/kanbanboard/KanbanBoard.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import BoardListButtons from "../../components/button/BoardListButtons.jsx";  
import "./StudentBoard.css";

const StudentBoard = () => {
  const [viewMode, setViewMode] = useState("kanban"); 


  useEffect(() => {

  }, []);

  return (
    <div className="student-board-container">

      <div className="main-content">


        <div className="content-wrapper">

          <div className="board-content">
            {viewMode === "kanban" ? (
              <KanbanBoard />
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

export default StudentBoard;
