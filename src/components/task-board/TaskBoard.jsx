import React, { useEffect, useState } from "react";
import TaskCategory from "../task-category/TaskCategory.jsx";
import { FaRegCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./TaskBoard.css";
import { fetchAllTasks } from "../../services/taskService.js"; 

const statusConfig = {
  "To Do": { icon: <FaRegCircle />, color: "#56358E" },
  "In Progress": { icon: <FaSpinner />, color: "#ffc107" },
  "Completed": { icon: <FaCheckCircle />, color: "#28a745" },
  "Overdue": { icon: <FaExclamationCircle />, color: "#dc3545" },
};

const parseDate = (dateStr) => {
  const [month, day] = dateStr.split(" ");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = months.indexOf(month);
  const year = new Date().getFullYear(); 
  return new Date(year, monthIndex, parseInt(day));
};

const TaskBoard = ({ filter, selectedWeek, isMentor = false }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskData = await fetchAllTasks(); 
        setTasks(taskData || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

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
          task.id === taskId ? { ...task, title: newTitle } : task
        ));
      }
    }
  };

  const statusFilteredTasks = Array.isArray(tasks)
  ? (filter === "All" ? tasks : tasks.filter(task => task.status === filter))
  : [];


  let filteredTasks = [...statusFilteredTasks];

  if (selectedWeek) {
    const startOfWeek = new Date(selectedWeek);
    startOfWeek.setDate(selectedWeek.getDate() - selectedWeek.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    filteredTasks = filteredTasks.filter(task => {
      const taskDate = parseDate(task.dueDate);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }

  const groupedTasks = {
    "To Do": filteredTasks.filter(task => task.status === "To Do"),
    "In Progress": filteredTasks.filter(task => task.status === "In Progress"),
    "Completed": filteredTasks.filter(task => task.status === "Completed"),
    "Overdue": filteredTasks.filter(task => task.status === "Overdue"),
  };

  if (loading) {
    return <div className="task-board">Loading tasks...</div>;
  }

  return (
    <div className="task-board">
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        statusTasks.length > 0 && (
          <TaskCategory
            key={status}
            status={status}
            tasks={statusTasks}
            config={statusConfig[status]}
            isMentor={isMentor}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )
      ))}
    </div>
  );
};

export default TaskBoard;
