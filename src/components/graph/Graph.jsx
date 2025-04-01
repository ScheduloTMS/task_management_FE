import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Graph.css";

const Graph = ({ tasks = [], data }) => {
  const chartData = data 

  return (
    <div className="graph-container">
      <h5>Task Completion Overview</h5>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend
            wrapperStyle={{
              fontWeight: "bold",
            }}
          />
          <Line
            type="monotone"
            dataKey="Completed"
            stroke="#56358E"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Not Completed"
            stroke="rgb(154, 128, 199)"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
