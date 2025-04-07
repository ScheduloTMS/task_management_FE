import React from "react";
import "./AssignedStudents.css";


const dummyStudents = [
  {
    id: "s1",
    name: "Alice Johnson",
    photo: "https://i.pravatar.cc/150?img=1",
    submitted: true,
  },
  {
    id: "s2",
    name: "Bob Smith",
    photo: "https://i.pravatar.cc/150?img=2",
    submitted: false,
  },
  {
    id: "s3",
    name: "Charlie Brown",
    photo: "https://i.pravatar.cc/150?img=3",
    submitted: true,
  },
];

const AssignedStudents = ({ students = dummyStudents }) => {
  return (
    <div>
      <h3 className="assigned-students-heading">Assigned Students</h3>
      <ul className="students-list">
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <img
              src={student.photo || "/default-avatar.png"}
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