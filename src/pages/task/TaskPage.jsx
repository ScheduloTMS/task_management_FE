

import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../layouts/topbar/Topbar.jsx";
import MentorTaskBoard from "./MentorBoard";
import MentorTaskList from "./MentorList";
import StudentTaskBoard from "./StudentBoard";
import StudentTaskList from "./StudentList";
import BoardListButtons from "../../components/button/BoardListButtons";
import CreateTaskSheet from "../../components/sidesheets/CreateTaskSheet.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";
import "./TaskPage.css";

const TaskPage = () => {
  const [viewMode, setViewMode] = useState("list");
  const { role } = useRecoilValue(authState);
  const isMentor = role === "MENTOR";
  

  return (
    <div className="taskpage-container">
      <Sidebar role={role} className="sidebar" />

      <div className="taskpage-content">
        <Topbar />
        <h2 className="hello">Your Tasks</h2>

        <div className="taskpage-scrollable">
          <div className="taskpage-header">
            <BoardListButtons viewMode={viewMode} setViewMode={setViewMode} />
            {isMentor && <CreateTaskSheet />}
          </div>

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
