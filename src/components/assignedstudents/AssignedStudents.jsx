import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./AssignedStudents.css";
import { getAssignedStudents } from "../../services/assignmentService";

const AssignedStudents = ({ taskId, onStudentClick }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found");

        const decoded = jwtDecode(token);
        const isMentor = decoded.role === "MENTOR";
        const currentUserEmail = decoded.sub?.toLowerCase();
        const currentUserNameGuess = currentUserEmail?.split("@")[0];

        const fetchedStudents = await getAssignedStudents(taskId, token);

        const filteredStudents = (fetchedStudents || []).filter((student) =>
          isMentor ? student.name?.toLowerCase() !== currentUserNameGuess : true
        );

        setStudents(filteredStudents);
      } catch (err) {
        console.error("Failed to fetch assigned students:", err);
        setError("Failed to load assigned students");
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchStudents();
    }
  }, [taskId]);

  const handleStudentClick = (student) => {
    
    navigate(`/tasks/${taskId}/student/${student.id}`, {
      state: { studentName: student.name },  
    });
    
    
    if (onStudentClick) {
      onStudentClick(student); 
    }
  };

  if (loading) return <div className="loading-message">Loading assigned students...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!students.length) return <div className="no-students-message">No assigned students found.</div>;

  return (
    <div className="assigned-students-container">
      <h3 className="assigned-students-heading">Assigned Students</h3>
      <ul className="students-list">
        {students.map((student) => (
          <li
            key={student.id}
            className="student-item"
            onClick={() => handleStudentClick(student)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                student.photo
                  ? `data:image/png;base64,${student.photo.split("#")[0]}`
                  : "/default-avatar.png"
              }
              alt={student.name}
              className="student-avatar"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="student-info">
              <span className="student-name">{student.name}</span>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

AssignedStudents.propTypes = {
  taskId: PropTypes.string.isRequired,
  onStudentClick: PropTypes.func
};

export default AssignedStudents;