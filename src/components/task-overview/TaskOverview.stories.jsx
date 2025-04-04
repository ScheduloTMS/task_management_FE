import React from "react";
import TaskOverview from "./TaskOverview";

export default {
  title: "Components/TaskOverview",
  component: TaskOverview,
};

const sampleTask = {
  title: "React Component Styling",
  description: "Create a well-structured Task Overview component.",
  score: "85 / 100",
};

export const Default = () => <TaskOverview task={sampleTask} />;