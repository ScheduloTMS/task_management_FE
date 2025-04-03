import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateTaskSheet.css";

const studentsList = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Davis",
  "David Williams",
  "Eleanor Brown",
  "Franklin White",
];

const CreateTaskModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectStudent = (student) => {
    if (!students.includes(student)) {
      setStudents([...students, student]);
    }
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleRemoveStudent = (student) => {
    setStudents(students.filter((s) => s !== student));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <>
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTaskModal">
        Create Task
      </button>

      <div className="modal fade" id="createTaskModal" tabIndex="-1" aria-labelledby="createTaskModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createTaskModalLabel">Create Task</h5>

            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Upload File</label>
                <input type="file" className="form-control" onChange={handleFileChange} />
              </div>

              {/* Student Multi-Select Dropdown */}
              <div className="mb-3">
                <label className="form-label">Assign to Students</label>
                <div className="student-dropdown" ref={dropdownRef}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search or select a student..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setDropdownOpen(true);
                    }}
                    onFocus={() => setDropdownOpen(true)}
                  />
                  {dropdownOpen && (
                    <ul className="list-group">
                      {studentsList
                        .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()) && !students.includes(s))
                        .map((student) => (
                          <li key={student} className="list-group-item list-group-item-action" onClick={() => handleSelectStudent(student)}>
                            {student}
                          </li>
                        ))}
                      {studentsList.filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()) && !students.includes(s)).length === 0 && (
                        <li className="list-group-item text-muted">No matching students</li>
                      )}
                    </ul>
                  )}
                </div>
                <div className="mt-2">
                  {students.map((student) => (
                    <span key={student} className="selected-student">
                      {student}
                      <button type="button" className="closex" onClick={() => handleRemoveStudent(student)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn secondary" data-bs-dismiss="modal">Close</button>
              <button className="success">Save Task</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModal;
