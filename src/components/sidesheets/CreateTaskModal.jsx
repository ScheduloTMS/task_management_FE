import React, { useEffect, useState, useRef } from "react";
import { fetchAllStudents } from "../../services/userService.js";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState.jsx";
import { createTask } from "../../services/taskService.js";
import { assignStudents } from "../../services/assignmentService.js";
 
const CreateTaskModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useRecoilValue(authState);
 
  const dropdownRef = useRef();
 
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const students = await fetchAllStudents(token);
        setStudentsList(students);
      } catch (error) {
        console.error("Error loading students:", error);
      }
    };
 
    loadStudents();
  }, [token]);
 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); 
    }
  };
 
  const handleSelectStudent = (id) => {
    if (!selectedStudents.includes(id)) {
      setSelectedStudents([...selectedStudents, id]);
    }
  };
 
  const handleRemoveStudent = (id) => {
    setSelectedStudents(selectedStudents.filter((s) => s !== id));
  };
 
  const handleCreateTask = async () => {
    const task = {
      title,
      description,
      dueDate,
      file, 
    };
 
    try {
      const taskRes = await createTask(task, token);
      const taskId = taskRes.response.taskId;
 
      await assignStudents(taskId, selectedStudents, token);
      alert("Task created and students assigned!");
 
      setTitle("");
      setDescription("");
      setDueDate("");
      setFile(null);
      setSelectedStudents([]);
      document.getElementById("createTaskModalClose").click();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Something went wrong.");
    }
  };
 
  return (
    <>
      <button
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#createTaskModal"
        style={{ backgroundColor: "#56358e", color: "white" }}
      >
        + Create Task
      </button>
 
      <div className="modal fade" id="createTaskModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button
                id="createTaskModalClose"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
 
              
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
 
              
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
 
              
              <div className="mb-3">
                <label className="form-label">Upload File</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
 
              
              <div className="mb-3">
                <label className="form-label">Assign Students</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                />
                {dropdownOpen && (
                  <ul className="list-group">
                    {studentsList
                      .filter(
                        (s) =>
                          s.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) &&
                          !selectedStudents.includes(s.userId)
                      )
                      .map((s) => (
                        <li
                          key={s.userId}
                          className="list-group-item"
                          onClick={() => handleSelectStudent(s.userId)}
                        >
                          {s.name} ({s.userId})
                        </li>
                      ))}
                  </ul>
                )}
                <div className="mt-2">
                  {selectedStudents.map((id) => {
                    const student = studentsList.find(
                      (s) => s.userId === id
                    );
                    return (
                      <span key={id} className="badge bg-primary me-2">
                        {student?.name} ({student?.userId})
                        <button
                          type="button"
                          className="btn-close btn-close-white btn-sm ms-2"
                          onClick={() => handleRemoveStudent(id)}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
 
           
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleCreateTask}
                style={{ backgroundColor: "#56358e", color: "white" }}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default CreateTaskModal;
 