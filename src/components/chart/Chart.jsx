import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { fetchAllTasks } from "../../services/taskService"; 
import "./Chart.css";

const Chart = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const loadTaskData = async () => {
      try {
        const tasks = await fetchAllTasks();

        const totalTasks = tasks.length;
        const statusCounts = {
          "To Do": 0,
          "In Progress": 0,
          "Completed": 0,
          "Overdue": 0,
        };

        tasks.forEach(task => {
          const status = task.status || "To Do"; 
          statusCounts[status]++;
        });

        const calculatedData = [
          { name: "Total Tasks", value: totalTasks, fill: "#d3d3d3" },
          { name: "To Do", value: statusCounts["To Do"], fill: "#56358E" },
          { name: "In Progress", value: statusCounts["In Progress"], fill: "#ffc107" },
          { name: "Completed", value: statusCounts["Completed"], fill: "#28a745" },
          { name: "Overdue", value: statusCounts["Overdue"], fill: "#dc3545" },
        ];

        setTaskData(calculatedData);
      } catch (err) {
        console.error("Failed to load task data:", err);
      }
    };

    loadTaskData();
  }, []);

  const totalTasks = taskData.find(item => item.name === "Total Tasks")?.value || 0;
  const filteredData = taskData.filter(item => item.name !== "Total Tasks");

  return (
    <div className="card shadow p-5 chartContainer">
      <h5 className="mb-4">Task Overview</h5>
      <div className="chartWrapper">
        <PieChart width={380} height={250}>
          <Pie
            data={filteredData}
            dataKey="value"
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={140}
            outerRadius={170}
            cornerRadius={8}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div className="totalTasks">{totalTasks}<br />Total Tasks</div>
        <div className="legend">
          {filteredData.map((item, index) => (
            <div key={index} className="legendItem">
              <span className="legendColor" style={{ backgroundColor: item.fill }}></span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
