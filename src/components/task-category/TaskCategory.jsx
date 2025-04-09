import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ NEW
import "./TaskCategory.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TaskCategory = ({ status, tasks, config, isMentor, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [expandedStudents, setExpandedStudents] = useState({});
  const navigate = useNavigate(); 

  const toggleDescription = (taskId, e) => {
    e.stopPropagation();
    setExpandedDescriptions(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleStudents = (taskId, e) => {
    e.stopPropagation();
    setExpandedStudents(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="task-category">
      <div className="status-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="status-icon" style={{ color: config.color }}>
          {config.icon}
        </span>
        <span className="status-text" style={{ color: config.color }}>
          {status}
        </span>
      </div>

      {isOpen && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="description-column">Description</th>
              <th>Created At</th>
              <th>Due Date</th>
              <th>{isMentor ? "Students" : "Mentor"}</th>
              {isMentor && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.taskId}
                className="task-row"
                onClick={() => navigate(`/tasks/${task.taskId}`)} 
                style={{ cursor: "pointer" }}
              >
                <td>{task.title}</td>
                <td>
                  {task.description}
                </td>
                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
                <td
                  className="students-cell"
                  onClick={(e) => isMentor && toggleStudents(task.taskId, e)}
                >
                  {isMentor ? (
                    <div className="student-names-container">
                      <span className={`student-names ${expandedStudents[task.taskId] ? 'expanded' : ''}`}>
                        {expandedStudents[task.taskId]
                          ? task.assignedStudents?.join(", ")
                          : `${task.assignedStudents?.slice(0, 2).join(", ")}${task.assignedStudents?.length > 2 ? "..." : ""}`}
                      </span>
                    </div>
                  ) : (
                    task.createdBy || "Mentor not assigned"
                  )}
                </td>
                {isMentor && (
                  <td className="action-buttons" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task.taskId);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.taskId);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskCategory;