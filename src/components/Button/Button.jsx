import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';

const Button = ({ label = 'Default', onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      className={`btn custom-login-btn w-100 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
