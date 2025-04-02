import React from "react";
import "./TaskOverview.css";

const TaskOverview = ({ task }) => {
  
  const safeTask = task || {
   
    description: "Good paragraphs begin with a topic sentence that briefly explains what the paragraph is about. Next come a few sentences for development and support, elaborating on the topic with more detail. Paragraphs end with a conclusion sentence that summarizes the topic or presents one final piece of support to wrap up.Good paragraphs begin with a topic sentence that briefly explains what the paragraph is about. Next come a few sentences for development and support, elaborating on the topic with more detail. Paragraphs end with a conclusion sentence that summarizes the topic or presents one final piece of support to wrap up.",
    score: "-",
  };

  return (
    <div className="task-overview-container">
      <h2 className="task-overview-heading">Task Overview</h2>
      <div className="task-details">
        {safeTask.title && (
          <div className="task-field">
            <strong>Title:</strong> <span>{safeTask.title}</span>
          </div>
        )}
        <div className="task-field">
          <strong>Description:</strong> <span>{safeTask.description}</span>
        </div>
        <div className="task-field">
          <strong>Score Obtained:</strong> <span>{safeTask.score}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;