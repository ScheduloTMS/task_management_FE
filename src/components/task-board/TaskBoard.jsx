import React, { useState } from "react";
import TaskCategory from "../task-category/TaskCategory.jsx";
import { FaRegCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./TaskBoard.css";

const statusConfig = {
  "To Do": { icon: <FaRegCircle />, color: "#56358E" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107"},
  "Completed": { icon: <FaCheckCircle />, color: "#28a745" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545" },
};

// Sample data with assignedStudents
const initialTaskData = [
  { id: 1, title: "Solutions Pages",description:"White lilies, scientifically known as Lilium candidum, are known for their pure white, trumpet-shaped flowers, often associated with purity, rebirth, and innocence, and are popular for weddings", mentor: "John", dueDate: "Mar 17",createdAt:"March 2", status: "To Do",assignedStudents: ["Alice", "Bob", "Charlie"] },
  { id: 2, title: "Solutions Pages",description:"hzhdljkd", mentor: "John", dueDate: "Mar 20",createdAt:"March 2", status: "To Do" ,assignedStudents: ["Alice", "Bob", "Charlie"]},
  { id: 3, title: "Solutions Pages",description:"hzhdljkd", mentor: "John", dueDate: "Mar 17",createdAt:"March 2", status: "In Progress",assignedStudents: ["Alice", "Bob", "Charlie"] },
  { id: 4, title: "Solutions Pages",description:"hzhdljkd", mentor: "John", dueDate: "Apr 17",createdAt:"March 2", status: "Overdue",assignedStudents: ["Alice", "Bob", "Charlie"] },
  { id: 5, title: "Solutions Pages",description:"hzhdljkd", mentor: "John", dueDate: "Mar 17",createdAt:"March 2", status: "Completed",assignedStudents: ["Alice", "Bob", "Charlie"] },
  { id: 6, title: "Solutions Pages",description:"hzhdljkd", mentor: "John", dueDate: "Mar 17",createdAt:"March 2", status: "To Do" ,assignedStudents: ["Alice", "Bob", "Charlie"]},
  { id: 7, title: "Solutions Pages",description:"hzhdljkd", mentor: "John", dueDate: "Jul 17",createdAt:"March 2", status: "Completed" ,assignedStudents: ["Alice", "Bob", "Charlie","Alice", "Bob", "Charlie"]},
];

const parseDate = (dateStr) => {
  const [month, day] = dateStr.split(" ");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = months.indexOf(month);
  const year = new Date().getFullYear(); 
  return new Date(year, monthIndex, parseInt(day));
};

const TaskBoard = ({ filter, selectedWeek, isMentor = false }) => {
  const [tasks, setTasks] = useState(initialTaskData);

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      const newTitle = prompt("Edit task title:", taskToEdit.title);
      if (newTitle !== null) {
        setTasks(tasks.map(task => 
          task.id === taskId ? {...task, title: newTitle} : task
        ));
      }
    }
  };

  // Filter logic remains the same
  const statusFilteredTasks = filter === "All" 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  let filteredTasks = [...statusFilteredTasks];
  
  if (selectedWeek) {
    const startOfWeek = new Date(selectedWeek);
    startOfWeek.setDate(selectedWeek.getDate() - selectedWeek.getDay()); 
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); 
    
    filteredTasks = statusFilteredTasks.filter(task => {
      const taskDate = parseDate(task.dueDate);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }

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
              isMentor={isMentor}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default TaskBoard;