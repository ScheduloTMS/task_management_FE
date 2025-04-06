import React, { useState } from "react";
import "./KanbanBoard.css";
import AvatarCircles from "../avatarcircles/AvatarCircles.jsx";
import { FaRegCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";

const sampleTasks = [
  {
    id: 1,
    title: "Group Project",
    dueDate: "2025-04-10",
    status: "To-Do",
    description: "White lilies known as Lilium candidum. These flowers are famous for their elegant white petals and symbolic meaning. They are often associated with purity, commitment, and rejuvenation, making them a popular choice for various occasions.",
    assignedStudents: [
      { name: "John Doe", avatar: "https://via.placeholder.com/28" },
      { name: "Jane Smith", avatar: "https://via.placeholder.com/28" },
    ],
    mentor: { avatar: "https://via.placeholder.com/28" },
  },
  {
    id: 2,
    title: "Group Project",
    dueDate: "2025-04-10",
    status: "To-Do",
    description: "White lilies known as Lilium candidum. These flowers are famous for their elegant white petals and symbolic meaning. They are often associated with purity, commitment, and rejuvenation, making them a popular choice for various occasions.",
    assignedStudents: [
      { name: "John Doe", avatar: "https://via.placeholder.com/28" },
      { name: "Jane Smith", avatar: "https://via.placeholder.com/28" },
    ],
    mentor: { avatar: "https://via.placeholder.com/28" },
  },
  
  {
    id: 3,
    title: "Assignment Review",
    dueDate: "2025-04-12",
    status: "Overdue",
    description: "The task involves reviewing assignments submitted by students. Each submission needs to be checked for plagiarism, formatting, and overall quality. Detailed feedback should be provided.",
    assignedStudents: [
      { name: "Alice Brown", avatar: "https://via.placeholder.com/28" },
      { name: "Bob White", avatar: "https://via.placeholder.com/28" },
    ],
    mentor: { name: "Prof. Daniel Scott", avatar: "https://via.placeholder.com/28" },
  },
  {
    id: 4,
    title: "Assignment Review",
    dueDate: "2025-04-12",
    status: "In Progress",
    description: "The task involves reviewing assignments submitted by students. Each submission needs to be checked for plagiarism, formatting, and overall quality. Detailed feedback should be provided.",
    assignedStudents: [
      { name: "Alice Brown", avatar: "https://via.placeholder.com/28" },
      { name: "Bob White", avatar: "https://via.placeholder.com/28" },
    ],
    mentor: { name: "Prof. Daniel Scott", avatar: "https://via.placeholder.com/28" },
  },
];

const statusConfig = {
  "To-Do": { icon: <FaRegCircle />, color: "#56358E", lightColor: "rgba(86, 53, 142, 0.1)" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107", lightColor: "rgba(255, 193, 7, 0.1)" },
  "Completed": { icon: <FaCheckCircle />, color: "#28a745", lightColor: "rgba(40, 167, 69, 0.1)" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545", lightColor: "rgba(220, 53, 69, 0.1)" }
};

const KanbanBoard = ({ isMentor }) => {
  const [expandedTask, setExpandedTask] = useState(null);

  const toggleDescription = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="kanban-board">
      {Object.keys(statusConfig).map((status) => {
        const { icon, color, lightColor } = statusConfig[status];

        return (
          <div key={status} className="kanban-column">
            <div className="kanban-header" style={{ backgroundColor: lightColor, borderColor: color }}>
              <span className="kanban-icon" style={{ color }}>{icon}</span>
              <span className="kanban-title" style={{ color }}>{status}</span>
            </div>

            {sampleTasks
              .filter((task) => task.status.toLowerCase() === status.toLowerCase())
              .map((task) => (
                <div key={task.id} className="kanban-card">
                  <h4>{task.title}</h4>
                  
                  <p 
  className={`task-description ${expandedTask === task.id ? 'expanded' : ''}`}
  onClick={() => toggleDescription(task.id)}
>
  {task.description}
</p>
                  
                  <p className="due-date">
                    <RiCalendarScheduleFill /> {task.dueDate}
                  </p>

                  {isMentor ? (
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: task.status === "In Progress" ? "50%" : task.status === "Completed" ? "100%" : "0%" }}></div>
                      </div>
                      <span className="progress-percentage">
                        {task.status === "In Progress" ? "50%" : task.status === "Completed" ? "100%" : "0%"}
                      </span>
                    </div>
                  ) : (
                    task.mentor && (
                      <div className="mentor-info">
                        <AvatarCircles avatars={[{ imageUrl: task.mentor.avatar }]} />
                      </div>
                    )
                  )}

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
        );
      })}
    </div>
  );
};

export default KanbanBoard;
