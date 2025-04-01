import React from "react";
import Graph from "./Graph";

export default {
  title: "Components/Graph",
  component: Graph,
};

const monthlyData = [
  { month: "Jan", Completed: 2, "Not Completed": 6 },
  { month: "Feb", Completed: 4, "Not Completed": 4 },
  { month: "Mar", Completed: 7, "Not Completed": 1 },
  { month: "Apr", Completed: 5, "Not Completed": 3 },
  { month: "May", Completed: 3, "Not Completed": 5 },
  { month: "Jun", Completed: 6, "Not Completed": 2 },
  
];

export const Default = () => (
  <Graph tasks={[]} data={monthlyData} />
);

