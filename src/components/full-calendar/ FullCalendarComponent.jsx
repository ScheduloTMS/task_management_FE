import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./fullCalendar.css";

const FullCalendarComponent = () => {
  const [events, setEvents] = useState([
    { id: "1", title: "Project Deadline", date: "2025-04-15" },
    { id: "2", title: "Code Review", date: "2025-04-18" },
  ]);

  const handleDateClick = (info) => {
    alert(`Clicked on: ${info.dateStr}`);
  };

  return (
    <div className="full-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => (
          <div className="custom-event">{eventInfo.event.title}</div>
        )}
      />
    </div>
  );
};

export default FullCalendarComponent;
