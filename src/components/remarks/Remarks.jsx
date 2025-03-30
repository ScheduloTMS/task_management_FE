import React, { useState, useEffect, useRef } from "react";
import "./Remarks.css";
import { FaPaperPlane } from "react-icons/fa";

const Remarks = ({ remarks: initialRemarks }) => {
  const [remarks, setRemarks] = useState(initialRemarks);
  const [newRemark, setNewRemark] = useState("");
  const remarksEndRef = useRef(null);  

  const handleSendRemark = () => {
    if (!newRemark.trim()) return;

    const newComment = {
      id: remarks.length + 1,
      user: {
        name: "John Doe",
        profile_photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg",
      },
      content: newRemark,
    };

    setRemarks([...remarks, newComment]);
    setNewRemark("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendRemark();
    }
  };

 
  useEffect(() => {
    if (remarksEndRef.current) {
      remarksEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [remarks]);

  return (
    <div className="remarks-container">
      <h2 className="remarks-heading">Comments</h2>
      <div className="remarks-list">
        {remarks.map((remark) => (
          <div key={remark.id} className="remark">
            <img src={remark.user.profile_photo} alt="User" className="user-photo" />
            <div className="remark-content">
              <span className="username">{remark.user.name}</span>
              <p className="comment-text">{remark.content}</p>
            </div>
          </div>
        ))}
        
        <div ref={remarksEndRef}></div>
      </div>
      <div className="remarks-input">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button onClick={handleSendRemark}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Remarks;
