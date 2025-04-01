import React from 'react';
import { 
  FaRegCircle, 
  FaSpinner, 
  FaCheckCircle, 
  FaExclamationCircle 
} from 'react-icons/fa';
import './TaskCard.css';

const TaskCard = ({ taskName, dueDate, status }) => {
  
  const statusConfig = {
    'To Do': { icon: <FaRegCircle />, color: "#56358E" ,lightColor: "rgba(86, 53, 142, 0.1)"},
    'In Progress': { icon: <FaSpinner />, color: "#ffc107" ,lightColor: "rgba(255, 193, 7, 0.1)"},
    'Completed': { icon: <FaCheckCircle />, color: "#28a745" , lightColor: "rgba(40, 167, 69, 0.1)"},
    'Overdue': { icon: <FaExclamationCircle />, color: "#dc3545",lightColor: "rgba(220, 53, 69, 0.1)" }
  };

  const { icon, color ,lightColor} = statusConfig[status] || statusConfig['To Do'];

  return (
    <div className="task-card p-4">
      <div className="task-content">
        <h3 className="task-name">{taskName}</h3>
        <div className="due-date-container">
          <span className="due-date-label">Due date</span>
          <span className="due-date">{dueDate}</span>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="status-container" style={{ borderColor: color,backgroundColor: lightColor }}>
        <span className="status-icon" style={{ color }}>{icon}</span>
        <span className="status-text" style={{ color }}>{status}</span>
      </div>
    </div>
  );
};

export default TaskCard;