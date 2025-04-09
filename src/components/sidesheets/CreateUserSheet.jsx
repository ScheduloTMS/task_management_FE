import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUser } from "../../services/userService";
import Alert from "../modal/Alert";

const CreateUserModal = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [showConflict, setShowConflict] = useState(false);
  const [conflictMessage, setConflictMessage] = useState("");

  const handleSubmit = async () => {
    if (loading) return;
    if (!name || !email) {
      alert("Name and Email are required!");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await createUser({ name, email, role }, token);

      console.log("✅ User created:", response);

      if (onUserCreated) onUserCreated(response);

      // Reset form
      setName("");
      setEmail("");
      setRole("STUDENT");

      // Close modal
      const modalEl = document.getElementById("createUserModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    } catch (err) {
      const status = err?.response?.status;
      const backendMsg = err?.response?.data?.message;

      console.error("❌ Error creating user:", err);

      if (status === 409) {
        setConflictMessage(backendMsg || "User with this email already exists.");
        setShowConflict(true);
      } else {
        alert("Something went wrong while creating the user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Conflict Alert */}
      {showConflict && (
        <Alert
          title="User Already Exists"
          message={conflictMessage}
          icon="warning"
          dangerMode={true}
          buttons={{
            confirm: {
              text: "OK",
              visible: true,
              className: "btn btn-warning",
            },
          }}
          onConfirm={() => setShowConflict(false)}
        />
      )}

      {/* Trigger Button */}
      <button
        className="btn btn-primary create-user-btn"
        data-bs-toggle="modal"
        data-bs-target="#createUserModal"
      >
        Create User
      </button>

      {/* Create User Modal */}
      <div
        className="modal fade"
        id="createUserModal"
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="STUDENT">Student</option>
                  <option value="MENTOR">Mentor</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserModal;
