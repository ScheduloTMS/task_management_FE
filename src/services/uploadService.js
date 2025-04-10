import axios from "axios";

const BASE_URL = "http://localhost:8081/api"; // update if needed

export const uploadAssignment = async (file, taskId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("taskId", taskId); // important for backend

  const token = localStorage.getItem("authToken");

  return axios.post(`${BASE_URL}/assignments`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
