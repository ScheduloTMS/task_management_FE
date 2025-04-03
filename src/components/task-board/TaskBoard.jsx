import React from "react";
import TaskCategory from "../task-category/TaskCategory.jsx";
import { FaRegCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./TaskBoard.css";

const statusConfig = {
  "To Do": { icon: <FaRegCircle />, color: "#56358E" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107"},
  "Completed": { icon: <FaCheckCircle />, color: "#28a745" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545" },
};

const taskData = [
  { id: 1, title: "Solutions Pages", assignee: "John", dueDate: "Mar 17", status: "To Do" },
  { id: 5, title: "Solutions Pages", assignee: "John", dueDate: "Mar 17", status: "To Do" },
  { id: 2, title: "Order Flow", assignee: "Doe", dueDate: "Apr 18", status: "In Progress" },
  { id: 6, title: "Order Flow", assignee: "Doe", dueDate: "Mar 18", status: "In Progress" },
  { id: 3, title: "About Us", assignee: "Alice", dueDate: "Apr 20", status: "Completed" },
  { id: 4, title: "Client Review", assignee: "Bob", dueDate: "Apr 15", status: "Overdue" },
];

// Helper function to parse date strings (assuming format like "Mar 17")
const parseDate = (dateStr) => {
  const [month, day] = dateStr.split(" ");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = months.indexOf(month);
  const year = new Date().getFullYear(); // Use current year
  return new Date(year, monthIndex, parseInt(day));
};

const TaskBoard = ({ filter, selectedWeek }) => {
  // Filter tasks based on status
  const statusFilteredTasks = filter === "All" 
    ? taskData 
    : taskData.filter(task => task.status === filter);

  // Filter tasks based on selected week
  let filteredTasks = [...statusFilteredTasks];
  
  if (selectedWeek) {
    const startOfWeek = new Date(selectedWeek);
    startOfWeek.setDate(selectedWeek.getDate() - selectedWeek.getDay()); // Sunday
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    
    filteredTasks = statusFilteredTasks.filter(task => {
      const taskDate = parseDate(task.dueDate);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }

  // Group the filtered tasks by status
  const groupedTasks = {
    "To Do": filteredTasks.filter((task) => task.status === "To Do"),
    "In Progress": filteredTasks.filter((task) => task.status === "In Progress"),
    "Completed": filteredTasks.filter((task) => task.status === "Completed"),
    "Overdue": filteredTasks.filter((task) => task.status === "Overdue"),
  };

  return (
    <div className="task-board">
      {Object.entries(groupedTasks).map(([status, tasks]) => {
        if (tasks.length > 0) {
          return (
            <TaskCategory 
              key={status} 
              status={status} 
              tasks={tasks} 
              config={statusConfig[status]} 
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default TaskBoard;