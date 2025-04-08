import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../../layouts/topbar/Topbar";
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
    <div className="calendar-layout">
      <div className="sidebar-section">
        <Sidebar />
      </div>
      <div className="main-section">
        <Topbar />
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
      </div>
    </div>
  );
};

export default FullCalendarComponent;