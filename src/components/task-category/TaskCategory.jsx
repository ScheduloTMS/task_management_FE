import React, { useState } from "react";
import "./TaskCategory.css";

const TaskCategory = ({ status, tasks, config, isMentor }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="task-category">
     
      <div className="status-header" style={{ backgroundColor: config.lightColor }} onClick={() => setIsOpen(!isOpen)}>
        <span className="status-icon" style={{ color: config.color }}>{config.icon}</span>
        <span className="status-text">{status}</span>
      </div>

     
      {isOpen && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Due Date</th>
              <th>Mentor</th>
              {isMentor && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="task-row">
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.createdAt}</td>
                <td>{task.dueDate}</td>
                <td>{task.mentor}</td>
                {isMentor && (
                  <td>
                    <button className="delete-btn" onClick={() => console.log("Delete Task", task.id)}>−</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskCategory;
