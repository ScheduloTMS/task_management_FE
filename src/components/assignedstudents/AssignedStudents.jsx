import React, { useEffect, useState } from "react";
import "./AssignedStudents.css";
import { getAssignedStudents } from "../../services/assignmentService";

const AssignedStudents = ({ taskId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("AssignedStudents mounted with taskId:", taskId);
  
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Fetched token:", token);
        const students = await getAssignedStudents(taskId, token);
        console.log("Assigned students:", students); // Now this should show the student array
        setStudents(students || []);
      } catch (err) {
        console.error("Failed to fetch assigned students:", err);
        setError("Failed to load assigned students");
      } finally {
        setLoading(false);
      }
    };
  
    if (taskId) {
      fetchStudents();
    } else {
      console.warn("No taskId provided to AssignedStudents");
    }
  }, [taskId]);

  if (loading) return <p>Loading assigned students...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!students || students.length === 0) return <p>No assigned students found.</p>;

  return (
    <div className="assigned-students-container">
      <h3 className="assigned-students-heading">Assigned Students</h3>
      <ul className="students-list">
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <img
              src={
                student.photo
                  ? `data:image/png;base64,${student.photo.split("#")[0]}`
                  : "/default-avatar.png"
              }
              alt={student.name}
              className="student-avatar"
            />
            <div className="student-info">
              <a href={`/student/${student.id}`} className="student-name">
                {student.name}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedStudents;
