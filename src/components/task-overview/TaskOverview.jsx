import React from "react";
import "./TaskOverview.css";

const TaskOverview = ({ task }) => {
  const safeTask = task || {
    title: "Complete the Frontend",
    description:
      "Good paragraphs begin with a topic sentence that briefly explains what the paragraph is about. Next come a few sentences for development and support, elaborating on the topic with more detail. Paragraphs end with a conclusion sentence that summarizes the topic or presents one final piece of support to wrap up.",
    dueDate: "2025-04-10",
    assignedBy: "John Doe",
    createdAt: "2025-04-01",
    score: "-",
    assets: [
      { name: "UI Design.pdf", url: "#" },
      { name: "Requirements.docx", url: "#" },
    ],
  };

  return (
    <div className="task-overview-container">
      {/* Task Title */}
      <h4 className="task-title">{safeTask.title}</h4>
      <hr className="divider" />

      {/* Description */}
      <div className="task-field">
        <strong>Description:</strong>
      </div>
      <p className="description-text">{safeTask.description}</p>

      {/* Assets Section */}
      {safeTask.assets && safeTask.assets.length > 0 && (
        <div className="task-assets-container">
          <strong className="task-assets-title">Assets:</strong>
          <ul className="task-assets">
            {safeTask.assets.map((asset, index) => (
              <li key={index} className="asset-item">
                <a href={asset.url} target="_blank" rel="noopener noreferrer">
                  {asset.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Due Date */}
      <div className="task-field">
        <strong>Due Date:</strong> <span>{safeTask.dueDate}</span>
      </div>

      {/* Assigned By */}
      <div className="task-field">
        <strong>Assigned By:</strong> <span>{safeTask.assignedBy}</span>
      </div>

      {/* Created At */}
      <div className="task-field">
        <strong>Created At:</strong> <span>{safeTask.createdAt}</span>
      </div>

      {/* Score Obtained */}
      <div className="task-field">
        <strong>Score Obtained:</strong> <span>{safeTask.score}</span>
      </div>
    </div>
  );
};

export default TaskOverview;
