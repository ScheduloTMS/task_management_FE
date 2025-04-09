import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskCategory.css";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteTask } from "../../services/taskService.js";
import EditTaskModal from "../sidesheets/CreateTaskSheet.jsx"; 

import {
  SuccessAlert,
  WarningAlert,
} from "../../layouts/modal-layout/ModalLayout.jsx"; 

const TaskCategory = ({ status, tasks, config, isMentor, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedStudents, setExpandedStudents] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const toggleStudents = (taskId, e) => {
    e.stopPropagation();
    setExpandedStudents((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleEditClick = (taskId) => {
    const task = tasks.find((t) => t.taskId === taskId);
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowWarning(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(taskToDelete, localStorage.getItem("authToken"));
      onDelete(taskToDelete);
      setShowWarning(false);
      setShowSuccess(true);
    } catch (error) {
      alert("Error deleting task");
      console.error(error);
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
                className="task-row"
                onClick={() => navigate(`/tasks/${task.taskId}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
                <td
                  className="students-cell"
                  onClick={(e) => isMentor && toggleStudents(task.taskId, e)}
                >
                  {isMentor ? (
                    <div className="student-names-container">
                      <span
                        className={`student-names ${
                          expandedStudents[task.taskId] ? "expanded" : ""
                        }`}
                      >
                        {expandedStudents[task.taskId]
                          ? task.assignedStudents?.join(", ")
                          : `${task.assignedStudents
                              ?.slice(0, 2)
                              .join(", ")}${
                              task.assignedStudents?.length > 2 ? "..." : ""
                            }`}
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
                        handleEditClick(task.taskId);
                      }}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(task.taskId);
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
      {showEditModal && editingTask && (
        <><div className="modal-backdrop fade show"></div><EditTaskModal
          task={editingTask}
          onClose={() => {
            setShowEditModal(false);
            setEditingTask(null);
          } }
          onTaskCreated={onEdit} /></>        
      )}

      
      {showWarning && (
        <WarningAlert
          title="Are you sure?"
          message="This action will permanently delete the task."
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowWarning(false);
            setTaskToDelete(null);
          }}
        />
      )}

      {/* Success Modal */}
      {showSuccess && (
        <SuccessAlert
          title="Task Deleted!"
          message="The task has been successfully deleted."
          onConfirm={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default TaskCategory;
