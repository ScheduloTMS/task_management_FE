import React, { useState } from 'react';
import './loginForm.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="form-container">

      <div className="input-group mb-4">
        <span className="input-group-text"><FaUser /></span>
        <input 
          type="text" 
          placeholder="Enter your Username" 
          className="form-control" 
        />
      </div>

      <div className="input-group mb-4 password-container">
        <span className="input-group-text"><FaLock /></span>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your Password"
            className="form-control password-input"
          />
          <button
            type="button"
            className="btn eye-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ?<FaEye />:<FaEyeSlash />}
          </button>
        </div>
      </div>

    </form>
  );
};

export default LoginForm;
