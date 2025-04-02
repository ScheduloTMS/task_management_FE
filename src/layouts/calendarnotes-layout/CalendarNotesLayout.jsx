import React from "react";
import CustomCalendar from "../../components/calendar/Calendar.jsx"; 
import Note from "../../components/notepad/Note.jsx";
import "./CalendarNotesLayout.css"; 

const CalendarNotesLayout = () => {
  return (
    <div className="calendar-notes-layout">
      <div className="calendar-section">
        <CustomCalendar />
      </div>
      <div className="notes-section">
        <Note />
      </div>
    </div>
  );
};

export default CalendarNotesLayout;