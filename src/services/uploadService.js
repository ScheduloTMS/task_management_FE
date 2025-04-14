import axios from "axios";

const BASE_URL = "http://localhost:8081/api"; 

export const uploadAssignment = async (file, taskId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("taskId", taskId); 

  const token = localStorage.getItem("authToken");

  return axios.post(`${BASE_URL}/assignments`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
