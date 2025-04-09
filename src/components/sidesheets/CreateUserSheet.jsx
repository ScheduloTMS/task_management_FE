import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createUser } from "../../services/userService";

const CreateUserSheet = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");

  const [loading, setLoading] = useState(false);

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
    console.log("User created:", response);

    if (onUserCreated) onUserCreated(response);

    setName("");
    setEmail("");
    setRole("STUDENT");

    const offcanvasEl = document.getElementById("createUserSheet");
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    offcanvas?.hide();
  } catch (err) {
    console.error("Error creating user:", err?.response || err.message);

    if (err.response?.status === 409) {
      alert("A user with this email already exists.");
    } else {
      alert("Failed to create user.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <button
        className="btn btn-primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#createUserSheet"
      >
        + Add User
      </button>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="createUserSheet">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Add User</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
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

          <button className="btn btn-success" onClick={handleSubmit}>
            Save User
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUserSheet;
