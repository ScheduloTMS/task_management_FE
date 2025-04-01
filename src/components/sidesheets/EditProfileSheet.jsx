import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfileSheet.css';

const EditProfileSheet = ({ onClose }) => {
  const [email, setEmail] = useState("user@example.com");

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  
  const handleSave = () => {
    onClose(); 
  };

  return (
    <>
  
      <div className="modal-backdrop show"></div>

      <div className="modal fade show d-block custom-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content animate-popup">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input type="file" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">ID</label>
                <input type="text" className="form-control" value="ST001" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value="John Doe" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <button className="custom-save-button" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileSheet;
