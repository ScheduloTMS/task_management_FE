import React from "react";
import Chart from "./Chart";

export default {
  title: "Components/Chart",
  component: Chart,
};

const sampleTasks = [
  { id: 1, status: "To Do" },
  { id: 2, status: "To Do" },
  { id: 3, status: "In Progress" },
  { id: 4, status: "In Progress" },
  { id: 5, status: "Completed" },
  { id: 6, status: "Completed" },
  { id: 7, status: "Completed" },
  { id: 8, status: "Completed" },
  { id: 9, status: "Completed" },
  { id: 10, status: "Overdue" },
  { id: 11, status: "Overdue" },
  { id: 12, status: "Overdue" },
];

export const Default = () => <Chart tasks={sampleTasks} />;
