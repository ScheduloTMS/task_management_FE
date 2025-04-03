import React, { useState } from "react";
import "./Input.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({ type, placeholder, icon, showToggle, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-field">
      <span className="input-icon">{icon}</span>
      <div className="divider2"></div>
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className="input-box"
        value={value}  
        onChange={onChange} 
      />
      {type === "password" && showToggle && (
        <span className="eye-icon" onClick={togglePassword}>
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </span>
      )}
    </div>
  );
};

export default Input;