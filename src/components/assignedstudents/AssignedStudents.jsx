import React, { useEffect, useState } from "react";
import "./AssignedStudents.css";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../services/userService";
import { getAssignedStudents } from "../../services/assignmentService";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";

const AssignedStudents = () => {
  const { taskId } = useParams();
  const [students, setStudents] = useState([]);
  const auth = useRecoilValue(authState);
  const token = auth?.token;

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const [assignmentData, users] = await Promise.all([
          getAssignedStudents(taskId, token),
          getAllUsers(token),
        ]);
  
        // Ensure assignmentData is always an array:
        const assignments = Array.isArray(assignmentData) ? assignmentData : [assignmentData];
  
        const mentorEmail = auth?.email?.toLowerCase();
  
        const enrichedStudents = assignments
          .filter((assignment) => {
            const assignedUser = users.find(
              (user) => user.userId.toLowerCase() === assignment.userId.toLowerCase()
            );
            return assignedUser && assignedUser.email.toLowerCase() !== mentorEmail;
          })
          .map((assignment) => {
            const matchedUser = users.find(
              (user) => user.userId.toLowerCase() === assignment.userId.toLowerCase()
            );
    
            return {
              id: assignment.userId,
              name: matchedUser?.name || assignment.userId,
              photo: matchedUser?.photo || "/default-avatar.png",
              submitted: assignment.submissionStatus === "Submitted",
            };
          });
    
        setStudents(enrichedStudents);
      } catch (error) {
        console.error("Error loading assigned students:", error);
      }
    };
  
    if (taskId && token) {
      loadStudents();
    }
  }, [taskId, token, auth?.email]);
  

  return (
    <div>
      <h3 className="assigned-students-heading">Assigned Students</h3>
      <ul className="students-list">
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <img
              src={student.photo}
              alt={student.name}
              className="student-avatar"
            />
            <div className="student-info">
              <a href={`/student/${student.id}`} className="student-name">
                {student.name}
              </a>
              <span
                className={`submission-status ${
                  student.submitted ? "submitted" : "not-submitted"
                }`}
              >
                {student.submitted ? "Submitted" : "Not Submitted"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedStudents;
