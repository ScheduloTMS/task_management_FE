import React from "react";
import "./TaskOverview.css";

const TaskOverview = ({ task }) => {
  return (
    <div className="task-overview-container">
      <h2 className="task-overview-heading">Task Overview</h2>
      <div className="task-details">
        <div className="task-field">
          <strong>Title :</strong> <span>{task.title}</span>
        </div>
        <div className="task-field">
          <strong>Description :</strong> <span>{task.description}</span>
        </div>
        <div className="task-field">
          <strong>Created At :</strong> <span>{task.createdAt}</span>
        </div>
        <div className="task-field">
          <strong>File Upload :</strong> 
          <a href={task.fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
        <div className="task-field">
          <strong>Score Obtained :</strong> <span>{task.score}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
