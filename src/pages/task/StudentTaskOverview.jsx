import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TaskOverview from "../../components/task-overview/TaskOverview.jsx";
import Remarks from "../../components/remarks/Remarks.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Uploads from "../../components/uploads/Uploads.jsx";
import MentorScoreUpload from "../../components/task-review/TaskReview.jsx";
import AssignedStudents from "../../components/assignedstudents/AssignedStudents.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState.jsx";
import "./StudentTaskOverview.css";

const TaskOverviewPage = () => {
  const { role } = useRecoilValue(authState);

  return (
    <div className="task-container">
      <Sidebar />
      <div className="main-content">
        <TopbarLayout />
        <div className="content-wrapper">
          <div className="left-column">
            <TaskOverview />
            <div className="uploads-container">
              {role === "STUDENT" ? <Uploads /> : <AssignedStudents />}
            </div>
          </div>

          {/* Wrap mentor component only */}
          {role === "STUDENT" ? (
            <Remarks />
          ) : (
            <div className="mentor-score-upload">
              <MentorScoreUpload />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskOverviewPage;
