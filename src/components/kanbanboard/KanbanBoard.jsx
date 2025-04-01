import React from "react";
import "./KanbanBoard.css";
import AvatarCircles from "../avatarcircles/AvatarCircles.jsx";
import { FaRegCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
const statusConfig = {
  "To-Do": { icon: <FaRegCircle />, color: "#56358E", lightColor: "rgba(86, 53, 142, 0.1)" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107", lightColor: "rgba(255, 193, 7, 0.1)" },
  "Completed": { icon: <FaCheckCircle />, color: "#28a745", lightColor: "rgba(40, 167, 69, 0.1)" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545", lightColor: "rgba(220, 53, 69, 0.1)" }
};

const KanbanBoard = ({ tasks, isMentor }) => {
  const getProgress = (status) => {
    switch (status.toLowerCase()) {
      case "to-do":
      case "overdue":
        return 0;
      case "in progress":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="kanban-board">
      {Object.keys(statusConfig).map((status) => {
        const { icon, color, lightColor } = statusConfig[status];

        return (
          <div key={status} className="kanban-column">
           
            <div className="kanban-header" style={{ backgroundColor: lightColor, borderColor: color }}>
              <span className="kanban-icon" style={{ color }}>{icon}</span>
              <span className="kanban-title" style={{ color }}>{status}</span>
            </div>

            {tasks
              .filter((task) => task.status.toLowerCase() === status.toLowerCase())
              .map((task) => (
                <div key={task.id} className="kanban-card">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p className="due-date"> <RiCalendarScheduleFill /> {task.dueDate} </p>
                  
                  <div className="progress-bar-container">
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${getProgress(task.status)}%` }}></div>
    </div>
    <span className="progress-percentage">
      {getProgress(task.status)}%
    </span>
  </div>
                  {isMentor && task.assignedStudents?.length > 0 && (
                    <div className="mentor-info">
                      <AvatarCircles
                        avatars={task.assignedStudents.map((student) => ({
                          imageUrl: student.avatar,
                        }))}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
