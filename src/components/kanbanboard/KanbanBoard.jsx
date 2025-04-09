import React, { useState, useEffect } from "react";
import {
  FaRegCircle,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaEllipsisV
} from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import AvatarCircles from "../avatarcircles/AvatarCircles.jsx";
import { fetchAllTasks } from "../../services/taskService.js";
import "./KanbanBoard.css";

const statusConfig = {
  "To Do": { icon: <FaRegCircle />, color: "#56358E", lightColor: "rgba(86, 53, 142, 0.1)" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107", lightColor: "rgba(255, 193, 7, 0.1)" },
  "Completed": { icon: <FaCheckCircle />, color: "#28a745", lightColor: "rgba(40, 167, 69, 0.1)" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545", lightColor: "rgba(220, 53, 69, 0.1)" }
};

const KanbanBoard = ({ isMentor, onEditTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchAllTasks();
      if (fetchedTasks) {
        const transformedTasks = fetchedTasks.map(item => ({
          ...item.task,
          status: item.status
        }));
        setTasks(transformedTasks);
      }
    };
    loadTasks();
  }, []);
  

  const toggleDescription = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const toggleMenu = (taskId, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === taskId ? null : taskId);
  };

  const handleEdit = (taskId, e) => {
    e.stopPropagation();
    setActiveMenu(null);
    onEditTask?.(taskId);
  };

  const handleDelete = (taskId, e) => {
    e.stopPropagation();
    
      setTasks(tasks.filter(task => task.task.id !== taskId));
      onDeleteTask?.(taskId);
    setActiveMenu(null);
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

            {tasks
             .filter(task => task.status?.toLowerCase() === status.toLowerCase())

              .map((task) => (
                <div key={task.taskid} className="kanban-card">
                  <div className="card-header">
                    <h5>{task.title}</h5>
                    {isMentor && (
                      <div className="dropdown-container">
                        <button
                          className="dropdown-trigger"
                          onClick={(e) => toggleMenu(task.id, e)}
                          aria-label="Task actions"
                        >
                          <FaEllipsisV />
                        </button>
                        {activeMenu === task.id && (
                          <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <button className="dropdown-item" onClick={(e) => handleEdit(task.id, e)}>Edit</button>
                            <button className="dropdown-item delete" onClick={(e) => handleDelete(task.id, e)}>Delete</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <p className={`task-description ${expandedTask === task.id ? 'expanded' : ''}`}
                    onClick={() => toggleDescription(task.taskid)}
                  >
                    {task.description}
                  </p>

                  <p className="due-date"><RiCalendarScheduleFill /> {task.dueDate}</p>

                  {isMentor ? (
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: task.status === "In Progress" ? "50%" : task.status === "Completed" ? "100%" : "0%" }}
                        />
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