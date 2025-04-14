import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

const CustomCalendar = ({ tasks = [] }) => {
  const [date, setDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState([]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; 
  };
  

  
  const taskMap = tasks.reduce((acc, taskObj) => {
    const due = taskObj.task.dueDate;
    if (!acc[due]) acc[due] = [];
    acc[due].push({ title: taskObj.task.title, status: taskObj.status });
    return acc;
  }, {});

  console.log("taskMap:", taskMap);


  const tileContent = ({ date, view }) => {
    const formatted = formatDate(date);
    if (view === "month" && taskMap[formatted]) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ height: "2px" }} /> {/* Spacer */}
          <div className="task-dot" />
        </div>
      );
    }
    return null;
  };
  
  console.log("Calendar Date:", formatDate(date), "Task Dates:", Object.keys(taskMap));


  
  const onDateClick = (value) => {
    setDate(value);
    const formatted = formatDate(value);
    setSelectedTasks(taskMap[formatted] || []);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <Calendar
          onChange={onDateClick}
          value={date}
          tileContent={tileContent}
        />
      </div>
      {selectedTasks.length > 0 && (
        <div className="task-tooltip">
          <div className="task-tooltip-header">
            <strong>Tasks on {formatDate(date)}</strong>
            <button className="tooltip-close" onClick={() => setSelectedTasks([])}>×</button>
          </div>
          <ul>
            {selectedTasks.map((task, index) => (
              <li key={index}>
                {task.title} -{" "}
                <span className={`status-label ${task.status.toLowerCase().replace(/\s/g, "-")}`}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

export default CustomCalendar;
