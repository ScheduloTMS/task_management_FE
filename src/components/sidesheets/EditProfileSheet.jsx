import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProfileSheet = () => {
  const [email, setEmail] = useState("user@example.com");

  return (
    <>
      <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#editProfileSheet">
        Edit Profile
      </button>

      <div className="offcanvas offcanvas-end" id="editProfileSheet">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Edit Profile</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
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
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="btn btn-success">Save Changes</button>
        </div>
      </div>
    </>
  );
};

export default EditProfileSheet;
