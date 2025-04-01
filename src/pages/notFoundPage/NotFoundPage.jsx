import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import './NotFoundPage.css'; // Create this CSS file (code provided below)

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="not-found-buttons">
          <button 
            onClick={() => navigate(-1)} 
            className="not-found-button back-button"
          >
            <FaArrowLeft className="button-icon" />
            Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="not-found-button home-button"
          >
            <FaHome className="button-icon" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;