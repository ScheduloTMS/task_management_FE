import axios from "axios";

const BASE_URL = "http://localhost:8081/api"; 

export const fetchAllTasks = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error("Token is missing!");
      return;
    }
  
    try {
      const response = await axios.get(`${BASE_URL}/tasks/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data.response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  export const createTask = async (task, token) => {
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("dueDate", task.dueDate);
    formData.append("file", task.file); // File object
  
    try {
      const res = await axios.post("http://localhost:8081/api/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error creating task:", error.response || error.message);
      throw error;
    }
  };
  
  