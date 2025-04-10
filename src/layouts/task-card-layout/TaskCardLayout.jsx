import React, { useEffect, useState } from "react";
import TaskCard from "../../components/task-card/TaskCard";
import { fetchAllTasks } from "../../services/taskService";
import dayjs from "dayjs";
import "./TaskCardLayout.css";
import CreateTaskModal from "../../components/sidesheets/CreateTaskSheet.jsx";
import { Button } from "react-bootstrap";

const TaskCardLayout = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadTasks = async () => {
    try {
      const response = await fetchAllTasks();
      const formattedTasks = response.map(entry => {
        const task = entry.task;
        return {
          id: task.taskId,
          taskName: task.title,
          dueDate: dayjs(task.dueDate).format("D MMMM YYYY"),
          status: entry.status,
        };
      });
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="task-cards-container">
      <div className="d-flex justify-content-end mb-2">
        <Button onClick={() => setShowModal(true)} variant="primary">
          + Create Task
        </Button>
      </div>

      <div className="task-cards-scroll">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              taskName={task.taskName}
              dueDate={task.dueDate}
              status={task.status}
            />
          ))
        )}
      </div>

      
      {showModal && (
        <CreateTaskModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTaskCreated={() => {
          fetchTasks(); 
        }}
      />
      
      )}
    </div>
  );
};

export default TaskCardLayout;
