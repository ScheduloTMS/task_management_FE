import React, { useEffect, useState } from "react";
import "./TaskOverview.css";
import { useParams } from "react-router-dom";
import { fetchTaskById } from "../../services/taskService";

const statusColorMap = {
  "To Do": "red",
  "In Progress": "orange",
  Completed: "green",
};

const TaskOverview = ({ isMentor }) => {
  const { taskId } = useParams(); 
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await fetchTaskById(taskId);
        setTaskData(data);
      } catch (error) {
        console.error("Failed to load task", error);
      }
    };
    loadTask();
  }, [taskId]);

  const safeTask = taskData?.task || {
    title: "Loading...",
    description: "Fetching task details...",
    createdAt: "",
    dueDate: "",
    score: "-",
    assets: "",
  };

  const handleDownload = () => {
    const base64Data = safeTask.file;
    const fileName = `task_${taskId}_attachment.pdf`; 

    
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href); 
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
