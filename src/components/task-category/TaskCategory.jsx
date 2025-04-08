import React, { useState } from "react";
import "./TaskCategory.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteTask, editTask } from "../../services/taskService";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState.jsx";
import { useNavigate } from "react-router-dom"; // 👈 import navigate

const TaskCategory = ({ status, tasks, config, isMentor, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { token } = useRecoilValue(authState);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [expandedStudents, setExpandedStudents] = useState({});
  const navigate = useNavigate(); // 👈 initialize navigate

  const toggleDescription = (taskId, e) => {
    e.stopPropagation();
    setExpandedDescriptions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const toggleStudents = (taskId, e) => {
    e.stopPropagation();
    setExpandedStudents((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      if (onDelete) {
        onDelete(taskId);
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  const handleEditTask = async (task) => {
    try {
      await editTask(
        task.taskId,
        {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          file: null,
        },
        token
      );

      alert("Task updated successfully");

      if (onEdit) {
        onEdit(task.taskId);
      }
    } catch (err) {
      console.error("Edit failed", err);
      alert("Edit failed");
    }
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
                className="task-row clickable-row"
                onClick={() => navigate(`/task/${task.taskId}`)} // 👈 navigate to task detail
              >
                <td>{task.title}</td>
                <td
                  className="description-cell"
                  onClick={(e) => toggleDescription(task.taskId, e)}
                >
                  {expandedDescriptions[task.taskId]
                    ? task.description
                    : task.description
                      ? `${task.description.substring(0, 100)}${task.description.length > 100 ? "..." : ""}`
                      : "No description"}
                </td>
                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
                <td
                  className="students-cell"
                  onClick={(e) => isMentor && toggleStudents(task.taskId, e)}
                >
                  {isMentor ? (
                    <div className="student-names-container">
                      <span className={`student-names ${expandedStudents[task.taskId] ? "expanded" : ""}`}>
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
                        handleEditTask(task);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.taskId);
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
