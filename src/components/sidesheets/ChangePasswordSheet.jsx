import React, { useState } from 'react';
import './ChangePasswordSheet.css';

const UpdatePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop show"></div>

      <div className="modal fade show d-block custom-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content animate-popup">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button type="button" className="close" onClick={onClose}>x</button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="custom-save-button" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordModal;
