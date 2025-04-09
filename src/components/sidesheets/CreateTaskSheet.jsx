import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from "../../states/authState.jsx";
import SuccessAlert from "../../layouts/modal-layout/ModalLayout.jsx"; 
import { createTask } from "../../services/taskService.js";
import { fetchAllStudents } from "../../services/userService.js";
import { assignStudents } from "../../services/assignmentService.js";

const CreateTaskModal = ({ show = false, onTaskCreated, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useRecoilValue(authState);
  const [successModal, setSuccessModal] = useState({ visible: false, title: "", message: "" });
  const dropdownRef = useRef();

  useEffect(() => {
    if (show) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setFile(null);
      setSelectedStudents([]);
      setSearchTerm("");
    }
  }, [show]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const students = await fetchAllStudents(token);
        setStudentsList(students);
      } catch (error) {
        console.error("Error loading students:", error);
      }
    };
    if (show) loadStudents();
  }, [token, show]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    const taskData = { title, description, dueDate, file };

    try {
      const response = await createTask(taskData, token);
      const taskId = response?.taskId || response?.response?.taskId;

      if (taskId && selectedStudents.length > 0) {
        await assignStudents(
          taskId,
          selectedStudents.map(s => s.userId),
          token
        );
      }

      setSuccessModal({
        visible: true,
        title: "Task Created!",
        message: "Task created successfully",
      });

      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      console.error("Task creation failed", err);
      alert("Something went wrong.");
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
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
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description*</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date*</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">File (optional)</label>
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
                  {selectedStudents.map((student, idx) => (
                    <span key={idx} className="badge bg-secondary me-1 mb-1">
                      {student.name || student.userId}
                      <button
                        type="button"
                        className="btn-close btn-close-white btn-sm ms-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudents(
                            selectedStudents.filter(s => s.userId !== student.userId)
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
                      .filter(student =>
                        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.userId?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .filter(student => !selectedStudents.some(s => s.userId === student.userId))
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
                onClick={handleSubmit}
                style={{ backgroundColor: "#56358e", color: "white" }}
                disabled={!title || !description || !dueDate}
              >
                Create Task
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

export default CreateTaskModal;


// import React, { useState, useEffect, useRef } from 'react';
// import { useRecoilValue } from 'recoil';
// import { authState } from "../../states/authState.jsx";
// import SuccessAlert from "../../layouts/modal-layout/ModalLayout.jsx"; 
// import { createTask} from "../../services/taskService.js";
// import { fetchAllStudents } from "../../services/userService.js";
// import { assignStudents } from "../../services/assignmentService.js";

// const CreateTaskModal = ({ task = null, show = false, onTaskCreated, onClose }) => {
//   const isEditMode = !!task;
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [file, setFile] = useState(null);
//   const [studentsList, setStudentsList] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { token } = useRecoilValue(authState);
//   const [successModal, setSuccessModal] = useState({ visible: false, title: "", message: "" });
//   const dropdownRef = useRef();

//   // Initialize form when task changes or modal opens
//   useEffect(() => {
//     if (show) {
//       setTitle(task?.title || "");
//       setDescription(task?.description || "");
//       setDueDate(task?.dueDate?.split('T')[0] || "");
//       setSelectedStudents(task?.assignedStudents || []);
//     }
//   }, [show, task]);

//   // Load students
//   useEffect(() => {
//     const loadStudents = async () => {
//       try {
//         const students = await fetchAllStudents(token);
//         setStudentsList(students);
//       } catch (error) {
//         console.error("Error loading students:", error);
//       }
//     };
//     if (show) loadStudents();
//   }, [token, show]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSubmit = async () => {
//     const taskData = { title, description, dueDate, file };

//     try {
//       let response;
//       if (isEditMode) {
//         response = await updateTask(task.taskId, taskData, token);
//       } else {
//         response = await createTask(taskData, token);
//         const taskId = response?.taskId || response?.response?.taskId;
//         if (taskId && selectedStudents.length > 0) {
//           await assignStudents(
//             taskId,
//             selectedStudents.map(s => s.userId), // Changed from email to userId
//             token
//           );
//         }
//       }

//       setSuccessModal({
//         visible: true,
//         title: isEditMode ? "Task Updated!" : "Task Created!",
//         message: isEditMode ? "Task updated successfully" : "Task created successfully",
//       });

//       if (onTaskCreated) onTaskCreated();
//     } catch (err) {
//       console.error("Operation failed", err);
//       alert("Something went wrong.");
//     }
//   };

//   if (!show) return null;

//   return (
//     <>
//       <div className="modal-backdrop fade show" onClick={onClose}></div>
//       <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">{isEditMode ? "Edit Task" : "Create Task"}</h5>
//               <button type="button" className="btn-close" onClick={onClose}></button>
//             </div>

//             <div className="modal-body">
//               <div className="mb-3">
//                 <label className="form-label">Title*</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Description*</label>
//                 <textarea
//                   className="form-control"
//                   rows="3"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Due Date*</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={dueDate}
//                   onChange={(e) => setDueDate(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">File (optional)</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//               </div>

//               {!isEditMode && (
//                 <div className="mb-3 position-relative" ref={dropdownRef}>
//                   <label className="form-label">Assign to Students</label>
//                   <div
//                     className="form-control d-flex flex-wrap"
//                     onClick={() => setDropdownOpen(true)}
//                     style={{ minHeight: "38px", cursor: "text" }}
//                   >
//                     {selectedStudents.map((student, idx) => (
//                       <span key={idx} className="badge bg-secondary me-1 mb-1">
//                         {student.name || student.userId}
//                         <button
//                           type="button"
//                           className="btn-close btn-close-white btn-sm ms-1"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedStudents(
//                               selectedStudents.filter(s => s.userId !== student.userId)
//                             );
//                           }}
//                         ></button>
//                       </span>
//                     ))}
//                     <input
//                       type="text"
//                       className="border-0 flex-grow-1"
//                       placeholder="Search students..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       onFocus={() => setDropdownOpen(true)}
//                     />
//                   </div>

//                   {dropdownOpen && (
//                     <ul className="list-group position-absolute w-100 mt-1 zindex-dropdown" 
//                         style={{ maxHeight: "200px", overflowY: "auto" }}>
//                       {studentsList
//                         .filter(student =>
//                           student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           student.userId?.toLowerCase().includes(searchTerm.toLowerCase())
//                         )
//                         .filter(student => !selectedStudents.some(s => s.userId === student.userId))
//                         .map((student) => (
//                           <li
//                             key={student.userId}
//                             className="list-group-item list-group-item-action"
//                             onClick={() => {
//                               setSelectedStudents([...selectedStudents, student]);
//                               setSearchTerm("");
//                             }}
//                             style={{ cursor: "pointer" }}
//                           >
//                             {student.name} ({student.userId})
//                           </li>
//                         ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="modal-footer">
//               <button className="btn btn-secondary" onClick={onClose}>
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleSubmit}
//                 style={{ backgroundColor: "#56358e", color: "white" }}
//                 disabled={!title || !description || !dueDate}
//               >
//                 {isEditMode ? "Update Task" : "Create Task"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {successModal.visible && (
//         <SuccessAlert
//           title={successModal.title}
//           message={successModal.message}
//           onConfirm={() => {
//             setSuccessModal({ ...successModal, visible: false });
//             onClose();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default CreateTaskModal;