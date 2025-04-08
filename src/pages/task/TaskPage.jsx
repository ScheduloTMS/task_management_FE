import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../layouts/topbar/Topbar";
import MentorTaskBoard from "./MentorBoard";
import MentorTaskList from "./MentorList";
import StudentTaskBoard from "./StudentBoard";
import StudentTaskList from "./StudentList";
import BoardListButtons from "../../components/button/BoardListButtons";
import CreateTaskSheet from "../../components/sidesheets/CreateTaskSheet.jsx"; 
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";

const TaskPage = () => {
  const [viewMode, setViewMode] = useState("list");
  const auth = useRecoilValue(authState);
  const isMentor = auth?.role === "MENTOR";

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: "20px"  }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",  marginBottom: "20px" }}>
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