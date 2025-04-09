import React, { useEffect, useState } from "react";
import "./TaskOverview.css";
import { useParams } from "react-router-dom";
import { fetchTaskById } from "../../services/taskService";

const TaskOverview = ({ isMentor }) => {
  const { taskId } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await fetchTaskById(taskId);
        setTaskData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load task", err);
        if (err?.status === 403) {
          setError("You don't have permission to view this task.");
        } else if (err?.status === 404) {
          setError("Task not found.");
        } else {
          setError("Failed to load task. Please try again.");
        }
      }
    };
    loadTask();
  }, [taskId, isMentor]);

  if (error) {
    return (
      <div className="task-overview-container error-message">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!taskData) {
    return <div className="task-overview-container">Loading task details...</div>;
  }

  const safeTask = taskData.task || {
    title: "Untitled Task",
    description: "No description provided.",
    createdAt: "",
    dueDate: "",
    score: "-",
    assets: "",
  };

  return (
    <div className="task-overview-container">
      <h2 className="task-title">{safeTask.title}</h2>

      {taskData?.status && (
        <div className={`task-status status-${taskData.status.replace(/\s/g, "").toLowerCase()}`}>
          Status: {taskData.status}
        </div>
      )}

      <hr className="task-divider" />

      <div className="task-details">
        <div className="task-field">
          <strong>Description:</strong>
          <span>{safeTask.description}</span>
        </div>

        {safeTask.file && (
          <div className="task-field">
            <strong>Assets:</strong>
            <a
              href={`data:application/pdf;base64,${safeTask.file}`}
              download={`${safeTask.title.replace(/\s+/g, "_")}Attachment.pdf`}
              className="file-link"
            >
              {`${safeTask.title.replace(/\s+/g, "_")}Attachment.pdf`}
            </a>
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
