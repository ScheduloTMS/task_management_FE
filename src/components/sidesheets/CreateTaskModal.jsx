import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUser } from "../../services/userService";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";

const CreateUserModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");

  const auth = useRecoilValue(authState);
  const token = auth?.token;

  const handleSave = async () => {
    try {
      console.log("Save button clicked!");
  
      const userData = {
        name,
        email,
        role: role.toUpperCase(),
      };
  
      console.log("Creating user:", userData);
      console.log("Token is:", token);
      console.log("Calling createUser...");
  
      const createdUser = await createUser(userData, token);
      console.log("User created:", createdUser);
      alert("User created successfully!");
  
      setName("");
      setEmail("");
      setRole("Student");
  
      const modalElement = document.getElementById("createUserModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    } catch (err) {
      console.error("Unexpected error in handleSave:", err);
      alert("An error occurred while creating the user.");
    }
  };
  
  return (
    <div
      className="modal fade"
      id="createUserModal"
      tabIndex="-1"
      aria-labelledby="createUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createUserModalLabel">
              Add User
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form>
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
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Student">Student</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
  type="button"
  className="btn"
  onClick={() => {
    console.log("Button clicked");
    handleSave();
  }}
  style={{ backgroundColor: "#56358e", color: "white" }}
>
  Save User
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
