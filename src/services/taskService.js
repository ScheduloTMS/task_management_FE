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
  
