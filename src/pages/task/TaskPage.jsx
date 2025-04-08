import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../layouts/topbar/Topbar";
import MentorTaskBoard from "./MentorBoard";
import MentorTaskList from "./MentorList";
import StudentTaskBoard from "./StudentBoard";
import StudentTaskList from "./StudentList";
import BoardListButtons from "../../components/button/BoardListButtons";
import CreateTaskSheet from "../../components/sidesheets/CreateTaskModal.jsx"; 
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";
import "./TaskPage.css";

const TaskPage = () => {
  const [viewMode, setViewMode] = useState("list");
  const auth = useRecoilValue(authState);
  const isMentor = auth?.role === "MENTOR";

  return (
    <div className="taskpage-container">
      <Sidebar className="sidebar" />
      
      <div className="main-content">
        <Topbar />

        <div className="taskpage-header">
          <BoardListButtons viewMode={viewMode} setViewMode={setViewMode} />
          {isMentor && <CreateTaskSheet />}
        </div>

        <div className="taskpage-body">
          {isMentor ? (
            viewMode === "kanban" ? <MentorTaskBoard /> : <MentorTaskList />
          ) : (
            viewMode === "kanban" ? <StudentTaskBoard /> : <StudentTaskList />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
