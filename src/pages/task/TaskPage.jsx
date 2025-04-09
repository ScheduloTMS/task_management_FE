import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../layouts/topbar/Topbar.jsx";
import MentorTaskBoard from "./MentorBoard";
import MentorTaskList from "./MentorList";
import StudentTaskBoard from "./StudentBoard";
import StudentTaskList from "./StudentList";
import BoardListButtons from "../../components/button/BoardListButtons";
import CreateTaskModal from "../../components/sidesheets/CreateTaskSheet.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";
import "./TaskPage.css";

const TaskPage = () => {
  const [viewMode, setViewMode] = useState("list");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false); // ⬅️ added this
  const { role } = useRecoilValue(authState);
  const isMentor = role === "MENTOR";

  const handleTaskCreated = () => {
    setShowCreateModal(false);
    setRefreshTasks(prev => !prev); // ⬅️ trigger task refresh
  };

  return (
    <div className="taskpage-container">
      <Sidebar role={role} className="sidebar" />

      <div className="taskpage-content">
        <Topbar />
        <h2 className="hello">Your Tasks</h2>

        <div className="taskpage-scrollable">
          <div className="taskpage-header">
            <BoardListButtons viewMode={viewMode} setViewMode={setViewMode} />
            {isMentor && (
              <button
                className="btn"
                onClick={() => setShowCreateModal(true)}
                style={{ backgroundColor: "#56358e", color: "white" }}
              >
                + Create Task
              </button>
            )}
          </div>

          {isMentor ? (
            viewMode === "kanban" ? (
              <MentorTaskBoard refresh={refreshTasks} />
            ) : (
              <MentorTaskList refresh={refreshTasks} />
            )
          ) : viewMode === "kanban" ? (
            <StudentTaskBoard refresh={refreshTasks} />
          ) : (
            <StudentTaskList refresh={refreshTasks} />
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateTaskModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  );
};

export default TaskPage;
