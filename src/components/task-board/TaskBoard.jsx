import React, { useState } from "react";
import TaskCategory from "../task-category/TaskCategory.jsx";
import { FaRegCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./TaskBoard.css";

const statusConfig = {
  "To Do": { icon: <FaRegCircle />, color: "#56358E", lightColor: "rgba(86, 53, 142, 0.1)" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107", lightColor: "rgba(255, 193, 7, 0.1)" },
  "Completed": { icon: <FaCheckCircle />, color: "#28a745", lightColor: "rgba(40, 167, 69, 0.1)" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545", lightColor: "rgba(220, 53, 69, 0.1)" },
};

const taskData = [
  { id: 1, title: "Solutions Pages", assignee: "John", dueDate: "Mar 17", status: "To Do" },
  { id: 2, title: "Order Flow", assignee: "Doe", dueDate: "Mar 18",  status: "In Progress" },
  { id: 3, title: "About Us", assignee: "Alice", dueDate: "Mar 20",  status: "Completed" },
  { id: 4, title: "Client Review", assignee: "Bob", dueDate: "Mar 15",  status: "Overdue" },
];

const TaskBoard = () => {
  const groupedTasks = {
    "To Do": taskData.filter((task) => task.status === "To Do"),
    "In Progress": taskData.filter((task) => task.status === "In Progress"),
    "Completed": taskData.filter((task) => task.status === "Completed"),
    "Overdue": taskData.filter((task) => task.status === "Overdue"),
  };

  return (
    <div className="task-board">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <TaskCategory key={status} status={status} tasks={tasks} config={statusConfig[status]} />
      ))}
    </div>
  );
};

export default TaskBoard;
