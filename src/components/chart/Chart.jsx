import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Chart.css";

const Chart = ({ tasks }) => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    if (tasks && tasks.length > 0) { 
      const totalTasks = tasks.length;
      const toDo = tasks.filter(task => task.status === "To Do").length;
      const inProgress = tasks.filter(task => task.status === "In Progress").length;
      const completed = tasks.filter(task => task.status === "Completed").length;
      const overdue = tasks.filter(task => task.status === "Overdue").length;
  
      const calculatedData = [
        { name: "Total Tasks", value: totalTasks, fill: "#d3d3d3" },
        { name: "To Do", value: toDo, fill: "#56358E" },
        { name: "In Progress", value: inProgress, fill: "#ffc107" },
        { name: "Completed", value: completed, fill: "#28a745" },
        { name: "Overdue", value: overdue, fill: "#dc3545" },
      ];
  
      setTaskData(calculatedData);
    } else {
      setTaskData([]); 
    }
  }, [tasks]);
  const totalTasks = taskData.find(item => item.name === "Total Tasks")?.value || 0;
  const filteredData = taskData.filter(item => item.name !== "Total Tasks");

  return (
    <div className="card shadow p-3 chartContainer">
      <h5 className="text-center mb-3">Task Overview</h5>

      <div className="chartWrapper">
        <PieChart width={400} height={250}>
          <Pie
            data={filteredData}
            dataKey="value"
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={130}
            outerRadius={150}
            cornerRadius={10}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
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
