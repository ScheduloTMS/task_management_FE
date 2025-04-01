import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateTaskSheet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <>
      <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#createTaskSheet">
        Create Task
      </button>

      <div className="offcanvas offcanvas-end" id="createTaskSheet">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Create Task</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <button className="btn btn-success">Save Task</button>
        </div>
      </div>
    </>
  );
};

export default CreateTaskSheet;
