import React from "react";
import TaskReview from "./TaskReview.jsx";

export default {
  title: "Mentor/TaskReview",
  component: TaskReview,
};

const Template = (args) => <TaskReview {...args} />;

export const Default = Template.bind({});
Default.args = {
  student: {
    id: "STU202501",
    name: "Jane Smith",
    submittedAt: "2025-04-02 12:45",
    files: [
      {
        name: "ProjectProposal.pdf",
        url: "/mock-files/ProjectProposal.pdf",
      },
      {
        name: "Codebase.zip",
        url: "/mock-files/Codebase.zip",
      },
    ],
  },
};