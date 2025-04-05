import React from "react";
import "./AvatarCircles.css"; 

const AvatarCircles = ({ avatars, maxDisplay = 5 }) => {
  return (
    <div className="avatar-group">
      {avatars.slice(0, maxDisplay).map((avatar, index) => (
        <img
          key={index}
          src={avatar.imageUrl}
          alt="User Avatar"
          className="avatar"
          style={{ zIndex: avatars.length - index }}
        />
      ))}
      {avatars.length > maxDisplay && (
        <span className="more-count">+{avatars.length - maxDisplay}</span>
      )}
    </div>
  );
};

export default AvatarCircles;
