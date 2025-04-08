import React, { useEffect, useState } from "react";
import CustomCalendar from "../../components/calendar/Calendar.jsx";
import Note from "../../components/notepad/Note.jsx";
import "./CalendarNotesLayout.css";
import { fetchAllTasks } from "../../services/taskService.js";

const CalendarNotesLayout = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchAllTasks();
      if (tasks) {
        setTasks(tasks);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="calendar-notes-layout">
      <div className="calendar-section">
        <CustomCalendar tasks={tasks} />
      </div>
      <div className="notes-section">
        <Note />
      </div>
    </div>
  );
};

export default CalendarNotesLayout;
