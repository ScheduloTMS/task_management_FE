import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../layouts/topbar/Topbar";
import "./fullCalendar.css";
import { fetchAllTasks } from "../../services/taskService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";

const FullCalendarComponent = () => {
  const { role } = useRecoilValue(authState);
  const [events, setEvents] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const taskList = await fetchAllTasks();
      if (taskList && Array.isArray(taskList)) {
        const calendarEvents = taskList.map((item) => {
          const task = item.task;
          return {
            id: task.taskId,
            title: task.title || "Untitled Task",
            date: task.dueDate,
            extendedProps: {
              description: task.description || "",
              status: (task.status || "pending").toLowerCase(), // default to "pending"
            },
          };
        });
        
        
        setEvents(calendarEvents);
      }
    };

    loadTasks();
  }, []);

  const handleEventClick = (info) => {
    setSelectedTask(info.event);
    setShowModal(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={role} className="sidebar" />

      <div className="calendar-content">
        <Topbar />

        <div className="calendar-full-box">
        <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  events={events}
  eventClick={handleEventClick}
  eventDidMount={(info) => {
    const dueDate = new Date(info.event.startStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = dueDate < today;
  
    const cell = info.el.closest(".fc-daygrid-day");
  
    if (cell && !cell.classList.contains("custom-colored")) {
      cell.classList.add("custom-colored");
      cell.classList.add(isPast ? "past-task-cell" : "upcoming-task-cell");
    }
  }}
  
/>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTask?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong> {selectedTask?.extendedProps.description}</p>
            <p><strong>Due Date:</strong> {selectedTask?.startStr}</p>
            <p><strong>Status:</strong> {selectedTask?.extendedProps.status}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FullCalendarComponent;
