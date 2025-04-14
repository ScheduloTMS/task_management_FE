import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { fetchRemarks, addRemark } from "../../services/remarkService.js";
import "./Remarks.css";

const Remarks = ({ taskId }) => {
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState("");
  const remarksEndRef = useRef(null);

  useEffect(() => {
    const loadRemarks = async () => {
      try {
        const data = await fetchRemarks(taskId);
        console.log("Fetched remarks:", data);
        setRemarks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load remarks", err);
      }
    };
    loadRemarks();
    console.log("Loaded Remarks with taskId:", taskId);
  }, [taskId]);

  useEffect(() => {
    remarksEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [remarks]);

  const handleSendRemark = async () => {
    if (!newRemark.trim()) return;

    try {
      const newComment = await addRemark(taskId, newRemark);
      console.log("New remark added:", newComment);
      setRemarks((prev) => [...prev, newComment]);
      setNewRemark("");
    } catch (err) {
      console.error("Failed to send remark", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendRemark();
    }
  };

  return (
    <div className="remarks-container">
      <h2 className="remarks-heading">Comments</h2>

      <div className="remarks-list">
        {Array.isArray(remarks) && remarks.length > 0 ? (
          remarks.map((remark) => (
            <div key={remark.remarkId} className="remark">
              <img
                src={
                  remark.userProfilePhoto
                    ? `data:image/jpeg;base64,${remark.userProfilePhoto}`
                    : "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg"
                }
                alt="User"
                className="user-photo"
              />
              <div className="remark-content">
                <span className="username">{remark.userName || "User"}</span>
                <p className="comment-text">{remark.comment}</p>
                {remark.createdAt && (
                  <small className="comment-time">
                    {new Date(remark.createdAt).toLocaleString()}
                  </small>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
        <div ref={remarksEndRef} />
      </div>

      <div className="remarks-input">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendRemark}
          disabled={!newRemark.trim()}
          aria-label="Send comment"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Remarks;
