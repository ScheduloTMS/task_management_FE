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
    <div className="task-overview-page-container">
      <Sidebar />
      <div className="task-overview-main-content">
        <TopbarLayout />
        <div className="task-overview-content-wrapper">
          <div className="task-overview-left-column">
            <TaskOverview />
            <div className="task-overview-uploads">
              {role === "student" ? <Uploads /> : <AssignedStudents />}
            </div>
          </div>

          <div className="task-overview-score-section">
            {role === "student" ? (
              <Remarks />
            ) : (
              <div className="task-overview-score-card">
                <MentorScoreUpload />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverviewPage;
