import React from "react";
import "./KanbanBoard.css";
import AvatarCircles from "../avatarcircles/AvatarCircles.jsx"; // Import custom component

const KanbanBoard = ({ tasks, isMentor }) => {
  const getProgress = (status) => {
    switch (status.toLowerCase()) {
      case "to-do":
      case "overdue":
        return 0;
      case "in progress":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="kanban-board">
      {["To-Do", "In Progress", "Completed", "Overdue"].map((status) => (
        <div key={status} className="kanban-column">
          <h3>{status}</h3>
          {tasks
            .filter((task) => task.status.toLowerCase() === status.toLowerCase())
            .map((task) => (
              <div key={task.id} className="kanban-card">
                <h4>{task.title}</h4>
                <p>Due: {task.dueDate}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgress(task.status)}%` }}
                  ></div>
                </div>
                {isMentor && task.assignedStudents?.length > 0 && (
                  <div className="mentor-info">
                    <AvatarCircles
                      avatars={task.assignedStudents.map((student) => ({
                        imageUrl: student.avatar,
                      }))}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
