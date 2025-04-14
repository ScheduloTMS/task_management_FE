import React, { useEffect, useState } from "react";
import "./TaskReview.css";
import Remarks from "../remarks/Remarks";
import { useLocation, useParams } from "react-router-dom";
import { fetchAssignmentDetails, submitAssignmentScore } from "../../services/submissionService";

const TaskReview = () => {
  const { taskId, studentId } = useParams(); 
  const { state } = useLocation(); 
  const [assignmentData, setAssignmentData] = useState(null);
  const [score, setScore] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;
  
      try {
        const data = await fetchAssignmentDetails(taskId, studentId);
        console.log("Raw API Response:", data);
  
        
        const { studentName, userId, submissionStatus, submittedDate, fileStatus, downloadUrl, fileName } = data;
  
        const assignment = {
          ...data,
          studentName: state?.studentName || studentName || userId, 
        };
  
        console.log("Assignment Data to Set:", assignment);
        setAssignmentData(assignment);
        setScore(data.score || "");
      } catch (error) {
        console.error("Fetch error:", error);
        setErrorMessage("Failed to load assignment details");
      }
    };
  
    fetchData();
  }, [taskId, studentId, state]);
  

  const handleScoreSubmit = async () => {
    if (!score || isNaN(score)) {
      setErrorMessage("Please enter a valid score (0-100)");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      console.log("Submitting score with:", { taskId, userId: studentId, score });
      await submitAssignmentScore(taskId, studentId, score);

      setSuccessMessage("Score submitted successfully");
      setAssignmentData(prev => ({
        ...prev,
        score,
        submissionStatus: "Reviewed"
      }));
    } catch (error) {
      console.error("Submission error:", error.response?.data || error);
      setErrorMessage(error.response?.data?.message || "Failed to submit score");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-review-container">
      <h2 className="section-title">Submission Details</h2>

      {errorMessage && <p className="error-msg">{errorMessage}</p>}
      {successMessage && <p className="success-msg">{successMessage}</p>}

      <div className="student-info">
        <p><strong>Student ID:</strong> {assignmentData?.userId || studentId}</p>
        <p><strong>Student Name:</strong> {assignmentData?.studentName || "N/A"}</p>
        <p><strong>Submission Status:</strong> {assignmentData?.submissionStatus ?? "N/A"}</p>
        <p><strong>Submitted Date:</strong> {assignmentData?.submittedDate ?? "N/A"}</p>

        {assignmentData?.fileStatus === "File attached" ? (
          <div className="uploaded-files">
            <strong>Files Uploaded:</strong>
            <ul>
              <li>
                <a href={assignmentData.downloadUrl} download>
                  {assignmentData.fileName}
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <p>No files submitted.</p>
        )}
      </div>

      <hr className="divider" />

      <div className="score-section">
        <h4>Upload Score</h4>
        <div className="score-submit">
          <input
            type="number"
            className="score-input"
            placeholder="Enter score (0-100)"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <button
            className="submit-score-btn"
            onClick={handleScoreSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </button>
        </div>
      </div>

      <hr className="divider" />

      <div className="comments-section">
        <Remarks taskId={taskId} studentId={studentId} />
      </div>
    </div>
  );
};

export default TaskReview;
