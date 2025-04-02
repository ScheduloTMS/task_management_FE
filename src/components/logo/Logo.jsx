import React from "react";
import "./Logo.css";
import logo from "../../assets/Group3.png";

const Logo = ({ size = "large" }) => {
  const logoSize = size === "large" ? 100 : 40; 
  const textSize = size === "large" ? "80px" : "24px"; 

  return (
    <div className="logo-container">
      <img 
        src={logo}
        alt="Schedulo Logo"
        className="logo-img"
        style={{ width: `${logoSize}px`, height: `${logoSize}px` }} 
      />
      <h2 className="site-name" style={{ fontSize: textSize, lineHeight: textSize }}>
        Schedulo
      </h2>
    </div>
  );
};

export default Logo;