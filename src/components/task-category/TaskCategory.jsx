import React, { useState } from "react";
import "./TaskCategory.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TaskCategory = ({ status, tasks, config, isMentor, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [expandedStudents, setExpandedStudents] = useState({});

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
              <tr key={task.id} className="task-row">
                <td>{task.title}</td>
                <td 
                  className="description-cell"
                  onClick={(e) => toggleDescription(task.id, e)}
                >
                  {expandedDescriptions[task.id] 
  ? task.description 
  : task.description 
    ? `${task.description.substring(0, 100)}${task.description.length > 100 ? "..." : ""}`
    : "No description"}

                </td>
                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
                <td 
                  className="students-cell"
                  onClick={(e) => isMentor && toggleStudents(task.id, e)}
                >
                  {isMentor ? (
                    <div className="student-names-container">
                      <span className={`student-names ${expandedStudents[task.id] ? 'expanded' : ''}`}>
  {expandedStudents[task.id]
    ? task.assignedStudents?.join(", ")
    : `${task.assignedStudents?.slice(0, 2).join(", ")}${task.assignedStudents?.length > 2 ? "..." : ""}`}
</span>

                    </div>
                  ) : (
                    task.mentor
                  )}
                </td>
                {isMentor && (
                  <td className="action-buttons">
                    <button 
                      className="edit-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task.id);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
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