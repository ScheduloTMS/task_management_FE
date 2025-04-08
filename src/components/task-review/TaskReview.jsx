import React from "react";
import "./TaskReview.css";
import Remarks from "../remarks/Remarks";

const TaskReview = ({ student }) => 
{
  const studentData = student || {
    id: "ST001",
    name: "John Doe",
    submittedAt: "2025-04-01 15:30",
    files: [
      { name: "DesignDocument.pdf", url: "/files/DesignDocument.pdf" },
      { name: "SourceCode.zip", url: "/files/SourceCode.zip" },
    ],
  };

  return (
    <div className="task-review-container">
      <h2 className="section-title">Submission Details</h2>

      <div className="student-info">
        <p><strong>Student ID:</strong> {studentData.id}</p>
        <p><strong>Student Name:</strong> {studentData.name}</p>
        <p><strong>Submitted At:</strong> {studentData.submittedAt}</p>
        <div className="uploaded-files">
          <strong>Files Uploaded:</strong>
          <ul>
            {studentData.files.map((file, index) => (
              <li key={index}>
                <a href={file.url} download>{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="divider" />

      <div className="score-section">
        <h4>Upload Score</h4>
        <div className="score-submit">
            <input
            type="number"
            className="score-input"
            placeholder="Enter score"
            min="0"
            max="100"
            />
            <button className="submit-score-btn">Submit Score</button>
        </div>
      </div>

      <hr className="divider" />
        <Remarks />
    </div>
  );
};

export default TaskReview;