import React from 'react';
import TaskCard from './TaskCard';

export default {
  title: 'Components/TaskCard',
  component: TaskCard,
};

const Template = (args) => <TaskCard {...args} />;

export const ToDo = Template.bind({});
ToDo.args = {
  taskName: 'Complete project documentation',
  dueDate: '20 March 2025',
  status: 'To Do'
};

export const InProgress = Template.bind({});
InProgress.args = {
  taskName: 'Implement user authentication',
  dueDate: '15 March 2025',
  status: 'In Progress'
};

export const Completed = Template.bind({});
Completed.args = {
  taskName: 'Design landing page',
  dueDate: '10 March 2025',
  status: 'Completed'
};

export const Overdue = Template.bind({});
Overdue.args = {
  taskName: 'Fix critical bugs',
  dueDate: '5 March 2025',
  status: 'Overdue'
};