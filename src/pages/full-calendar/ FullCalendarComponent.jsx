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
            title: task.title,
            date: task.dueDate,
            extendedProps: {
              description: task.description,
              
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
      <div className="main-content">
        <Topbar />
        

        <div className="calendar-full-box">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => (
              <div className="custom-event">{eventInfo.event.title}</div>
            )}
          />
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTask?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong> {selectedTask?.extendedProps.description}</p>
            <p><strong>Due Date:</strong> {selectedTask?.startStr}</p>
            
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FullCalendarComponent;
