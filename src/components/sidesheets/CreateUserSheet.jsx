import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUserSheet = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");

  return (
    <>
      <button className="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#createUserSheet">
        Add User
      </button>

      <div className="offcanvas offcanvas-end" id="createUserSheet">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Add User</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <button className="btn btn-success">Save User</button>
        </div>
      </div>
    </>
  );
};

export default CreateUserSheet;
