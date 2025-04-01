import React from "react";
import KanbanBoard from "./KanbanBoard";
import img from "../../assets/profile.png";

export default {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
};

const sampleTasks = [
  {
    id: 1,
    title: "Group Project",
    dueDate: "2025-04-10",
    status: "To-Do",
    assignedStudents: [
      { name: "John Doe", avatar: {img} },
      { name: "Jane Smith", avatar: "https://via.placeholder.com/28" },
    ],
  },
  {
    id: 2,
    title: "Assignment Review",
    dueDate: "2025-04-12",
    status: "In Progress",
    assignedStudents: [
      { name: "Alice Brown", avatar: "https://via.placeholder.com/28" },
      { name: "Bob White", avatar: "https://via.placeholder.com/28" },
      { name: "Charlie Green", avatar: "https://via.placeholder.com/28" },
    ],
  },
  {
    id: 3,
    title: "Assignment",
    dueDate: "2025-04-12",
    status: "In Progress",
    assignedStudents: [
      { name: "Alice Brown", avatar: "https://via.placeholder.com/28" },
      { name: "Bob White", avatar: "https://via.placeholder.com/28" },
      { name: "Charlie Green", avatar: "https://via.placeholder.com/28" },
    ],
  },
];

export const StudentView = () => <KanbanBoard tasks={sampleTasks} isMentor={false} />;
export const MentorView = () => <KanbanBoard tasks={sampleTasks} isMentor={true} />;
