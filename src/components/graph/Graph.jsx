import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Graph.css";

const Graph = ({ tasks = [], data = [
    { month: "Jan", Completed: 20, "Not Completed": 10 },
    { month: "Feb", Completed: 35, "Not Completed": 5 },
    { month: "Mar", Completed: 50, "Not Completed": 15 },
    { month: "Apr", Completed: 45, "Not Completed": 20 },
    { month: "May", Completed: 60, "Not Completed": 8 },
    { month: "Jun", Completed: 70, "Not Completed": 12 },
  ] }) => {
    return (
      <div className="graph-container">
        <h5>Task Completion Overview</h5>
        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ fontWeight: "bold" }} />
            <Line
              type="monotone"
              dataKey="Completed"
              stroke="rgb(40, 167, 69)"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Not Completed"
              stroke="rgb(255,0, 0)"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  

export default Graph;
