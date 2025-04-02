import React, { useState, useEffect, useRef } from "react";
import "./Remarks.css";
import { FaPaperPlane } from "react-icons/fa";

const Remarks = ({ remarks: initialRemarks = [] }) => {
  // Initialize with default empty array if initialRemarks is undefined
  const [remarks, setRemarks] = useState(() => {
    return Array.isArray(initialRemarks) ? initialRemarks : [];
  });
  const [newRemark, setNewRemark] = useState("");
  const remarksEndRef = useRef(null);

  const handleSendRemark = () => {
    if (!newRemark.trim()) return;

    const newComment = {
      id: Date.now(), // Better unique ID using timestamp
      user: {
        name: "John Doe",
        profile_photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg",
      },
      content: newRemark,
     
    };

    setRemarks(prev => [...prev, newComment]);
    setNewRemark("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendRemark();
    }
  };

  useEffect(() => {
    remarksEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [remarks]);

  return (
    <div className="remarks-container">
      <h2 className="remarks-heading">Comments</h2>
      
      <div className="remarks-list">
        {remarks.length > 0 ? (
          remarks.map((remark) => (
            <div key={remark.id} className="remark">
              <img 
                src={remark.user?.profile_photo} 
                alt="User" 
                className="user-photo" 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
              <div className="remark-content">
                <span className="username">
                  {remark.user?.name || "Anonymous"}
                </span>
                <p className="comment-text">{remark.content}</p>
                {remark.timestamp && (
                  <small className="comment-time">
                    {new Date(remark.timestamp).toLocaleString()}
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