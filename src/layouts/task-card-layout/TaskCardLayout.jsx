import React, { useEffect, useState } from "react";
import TaskCard from "../../components/task-card/TaskCard";
import { fetchAllTasks } from "../../services/taskService";
import dayjs from "dayjs";
import "./TaskCardLayout.css";

const TaskCardLayout = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchAllTasks();

        console.log("Formatted Response:", response); // 🔍 for debugging

        const formattedTasks = response.map(entry => {
          const task = entry.task;
          return {
            id: task.taskId,
            taskName: task.title,
            dueDate: dayjs(task.dueDate).format("D MMMM YYYY"),
            status: entry.status, // from outer object
          };
        });

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="task-cards-container">
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
    </div>
  );
};

export default TaskCardLayout;
