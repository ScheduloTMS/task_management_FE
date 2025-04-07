import { useEffect, useState } from "react";
import axios from "axios";

const useTasks = (filter, selectedWeek) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/tasks/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        let filteredTasks = response.data.body;

        
        if (filter !== "All") {
          filteredTasks = filteredTasks.filter(task => task.status === filter);
        }

        
        if (selectedWeek) {
          const start = new Date(selectedWeek);
          const end = new Date(selectedWeek);
          end.setDate(end.getDate() + 6);
          filteredTasks = filteredTasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= start && dueDate <= end;
          });
        }

        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [filter, selectedWeek]);

  return { tasks, loading };
};

export default useTasks;
