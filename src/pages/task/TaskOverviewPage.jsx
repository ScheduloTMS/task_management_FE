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
import "./TaskOverviewPage.css";

const TaskOverviewPage = () => {
  const { role } = useRecoilValue(authState);

  return (
    <div className="dashboard-container">
      <Sidebar role={role} className="sidebar" />

      <div className="main-content">
        <TopbarLayout />
        <h2>Task Overview</h2>

        <div className="dashboard-content">
          <div className="dashboard-box task-overview">
            <TaskOverview />
          </div>

          <div className="dashboard-box uploads">
            {role === "student" ? <Uploads /> : <AssignedStudents />}
          </div>

          <div className="dashboard-box remarks">
            {role === "student" ? <Remarks /> : <MentorScoreUpload />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverviewPage;
