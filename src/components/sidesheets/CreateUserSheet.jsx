import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateUserSheet.css"; 

const CreateUserModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); 

  return (
    <>
      <button className="btn success" data-bs-toggle="modal" data-bs-target="#createUserModal">
        Add User
      </button>

      <div className="modal fade" id="createUserModal" tabIndex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createUserModalLabel">Add User</h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select 
                  className="form-control" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled hidden>Select role</option>
                  <option value="Student">Student</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="secondary" data-bs-dismiss="modal">Close</button>
              <button className="success" disabled={!name || !email || !role}>Save User</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserModal;
