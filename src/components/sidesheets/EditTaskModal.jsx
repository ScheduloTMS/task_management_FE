import React, { useEffect, useState, useRef } from "react";
import { SuccessAlert } from "../../layouts/modal-layout/ModalLayout.jsx";
import { editTask } from "../../services/taskService.js";
import { fetchAllStudents } from "../../services/userService.js";
import { assignStudents } from "../../services/assignmentService.js";

const EditTaskModal = ({ task, token, show = false, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successModal, setSuccessModal] = useState({ visible: false, title: "", message: "" });
  const dropdownRef = useRef();

  useEffect(() => {
    if (show && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate?.split("T")[0] || "");
      setSelectedStudents(task.assignedStudents || []);
    }
  }, [task, show]);

  // Fetch students
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const students = await fetchAllStudents(token);
        setStudentsList(students);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    if (show) loadStudents();
  }, [token, show]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedTask = { title, description, dueDate, file };
      await editTask(task.taskId, updatedTask, token);

      if (selectedStudents.length) {
        await assignStudents(
          task.taskId,
          selectedStudents.map((s) => s.userId),
          token
        );
      }

      setSuccessModal({
        visible: true,
        title: "Task Updated!",
        message: "The task was updated successfully.",
      });

      onTaskUpdated?.();
    } catch (err) {
      console.error("Task update failed:", err);
      alert("Failed to update task.");
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title*</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description*</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date*</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Replace File (optional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="mb-3 position-relative" ref={dropdownRef}>
                <label className="form-label">Assign to Students</label>
                <div
                  className="form-control d-flex flex-wrap"
                  onClick={() => setDropdownOpen(true)}
                  style={{ minHeight: "38px", cursor: "text" }}
                >
                  {selectedStudents.map((student) => (
                    <span key={student.userId} className="badge bg-secondary me-1 mb-1">
                      {student.name || student.userId}
                      <button
                        type="button"
                        className="btn-close btn-close-white btn-sm ms-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudents((prev) =>
                            prev.filter((s) => s.userId !== student.userId)
                          );
                        }}
                      ></button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="border-0 flex-grow-1"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setDropdownOpen(true)}
                  />
                </div>

                {dropdownOpen && (
                  <ul
                    className="list-group position-absolute w-100 mt-1 zindex-dropdown"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {studentsList
                      .filter((student) =>
                        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.userId?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .filter((student) => !selectedStudents.some((s) => s.userId === student.userId))
                      .map((student) => (
                        <li
                          key={student.userId}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            setSelectedStudents([...selectedStudents, student]);
                            setSearchTerm("");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {student.name} ({student.userId})
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                style={{ backgroundColor: "#56358e", color: "white" }}
                disabled={!title || !description || !dueDate}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {successModal.visible && (
        <SuccessAlert
          title={successModal.title}
          message={successModal.message}
          onConfirm={() => {
            setSuccessModal({ ...successModal, visible: false });
            onClose();
          }}
        />
      )}
    </>
  );
};

export default EditTaskModal;

