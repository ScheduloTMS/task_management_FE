import React from "react";
import "./SideSheet.css";
import Button from "../../components/button/Button";

const ChangePasswordSheet = ({ show, handleClose }) => {
  return (
    <div className={`offcanvas offcanvas-end ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Change Password</h5>
        <button className="btn-close" onClick={handleClose}>×</button>
      </div>
      <div className="offcanvas-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" />
          </div>
          <Button text="Save Changes" onClick={handleClose} />
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordSheet;
