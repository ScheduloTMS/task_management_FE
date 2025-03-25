import React from "react";
import "./Logo.css";
import logo from "../../assets/Group3.png";

const Logo = () => {
  return (
    <div className="logo-section">
      <img src={logo} alt="Site Logo" className="logo-img" />
      <h2 className="site-name">Schedulo</h2>
    </div>
  );
};

export default Logo;
