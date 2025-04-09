import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchAllTasks } from "../../services/taskService"; 
import dayjs from "dayjs"; 
import "./Graph.css";

const Graph = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const loadGraphData = async () => {
      try {
        const tasks = await fetchAllTasks();
        const monthsMap = {};

        tasks.forEach((task) => {
          const month = dayjs(task.createdAt).format("MMM"); 
          const status = task.status || "To Do";

          if (!monthsMap[month]) {
            monthsMap[month] = { month, Completed: 0, "Not Completed": 0 };
          }

          if (status === "Completed") {
            monthsMap[month].Completed += 1;
          } else {
            monthsMap[month]["Not Completed"] += 1;
          }
        });

        
        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const result = allMonths
          .filter((month) => monthsMap[month]) 
          .map((month) => monthsMap[month]);

        setMonthlyData(result);
      } catch (err) {
        console.error("Failed to fetch task data:", err);
      }
    };

    loadGraphData();
  }, []);

  return (
    <div className="graph-container">
      <h5>Task Completion Overview</h5>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={monthlyData}>
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
            stroke="rgb(255, 0, 0)"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
