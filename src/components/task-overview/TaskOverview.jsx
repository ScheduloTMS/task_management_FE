import React from "react";
import "./TaskOverview.css";

const TaskOverview = ({ task, isMentor }) => {
  const safeTask = task || {
    title: "Sample Task Title",
    description:
      "Good paragraphs begin with a topic sentence that briefly explains what the paragraph is about...",
    createdAt: "2025-04-08",
    dueDate: "2025-04-15",
    score: "-",
    assets: "Asset.zip",
  };

  return (
    <div className="task-overview-container">
      <h2 className="task-title">{safeTask.title}</h2>
      <hr className="task-divider" />

      <div className="task-details">
        <div className="task-field">
          <strong>Description:</strong>
          <span>{safeTask.description}</span>
        </div>

        {safeTask.assets && (
          <div className="task-field">
            <strong>Assets:</strong>
            <span>{safeTask.assets}</span>
          </div>
        )}

        {safeTask.createdAt && (
          <div className="task-field">
            <strong>Created At:</strong>
            <span>{safeTask.createdAt}</span>
          </div>
        )}

        {safeTask.dueDate && (
          <div className="task-field">
            <strong>Due Date:</strong>
            <span>{safeTask.dueDate}</span>
          </div>
        )}

        {!isMentor && (
          <div className="task-field">
            <strong>Score Obtained:</strong>
            <span>{safeTask.score}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskOverview;
