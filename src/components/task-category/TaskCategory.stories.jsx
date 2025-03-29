import React from "react";
import TaskCategory from "./TaskCategory";

export default {
  title: "TaskCategory",
  component: TaskCategory,
};

export const Default = () => (
  <TaskCategory
    status="In Progress"
    tasks={[{ id: 1, name: "Test Task", assignee: "John", dueDate: "March 20", priority: "High" }]}
  />
);
