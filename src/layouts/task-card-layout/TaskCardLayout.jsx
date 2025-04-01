import React from 'react';
import TaskCard from '../../components/task-card/TaskCard';
import './TaskCardLayout.css';

const TaskCardLayout = () => {
  
  const tasks = [
    { id: 1, taskName: 'Project documentation', dueDate: '20 March 2025', status: 'To Do' },
    { id: 2, taskName: 'Implement user authentication', dueDate: '15 March 2025', status: 'In Progress' },
    { id: 3, taskName: 'Design landing page', dueDate: '10 March 2025', status: 'Completed' },
    { id: 4, taskName: 'Fix bug in the Admin Panel', dueDate: '5 March 2025', status: 'Overdue' },
    { id: 5, taskName: 'Submit task pages', dueDate: '25 March 2025', status: 'To Do' },
    { id: 6, taskName: 'Deploy to production', dueDate: '30 March 2025', status: 'In Progress' },
  ];

  return (
    <div className="task-cards-container">
      <div className="task-cards-scroll">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            taskName={task.taskName}
            dueDate={task.dueDate}
            status={task.status}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCardLayout;