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

export const createTask = async (task, token) => 
  {
  const formData = new FormData();
  formData.append("title", task.title);
  formData.append("description", task.description);
  formData.append("dueDate", task.dueDate);
  formData.append("file", task.file); // File object

  try {
    const res = await axios.post(`${BASE_URL}/tasks`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error.message);
    throw error;
  }
};

export const editTask = async (taskId, updatedTask, token) => {
  const formData = new FormData();
  formData.append("title", updatedTask.title);
  formData.append("description", updatedTask.description);
  formData.append("dueDate", updatedTask.dueDate);

  if (updatedTask.file) {
    formData.append("file", updatedTask.file);
  }

  try {
    const res = await axios.put(`${BASE_URL}/tasks/${taskId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error editing task:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteTask = async (taskId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchTaskById = async (taskId) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Token is missing!");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.response; 
  } catch (error) {
    console.error("Error fetching task:", error.response?.data || error.message);
    throw error;
  }
};
