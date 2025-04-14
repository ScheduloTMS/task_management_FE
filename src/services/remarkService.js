
import axios from "axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  
  return {
    Authorization: `Bearer ${token}`,
  };
};

const BASE_URL = "http://localhost:8081/api";

export const fetchRemarks = async (taskId) => {
  const res = await axios.get(`${BASE_URL}/tasks/${taskId}/remarks`, {
    headers: getAuthHeaders(),
  });
  return res.data.response;
};

export const addRemark = async (taskId, comment) => {
  const token = localStorage.getItem("authToken");
  console.log("Token being sent:", token);

  const formData = new FormData();
  formData.append("comment", comment);

  const res = await axios.post(
    `${BASE_URL}/tasks/${taskId}/remarks`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.response;
};


export const deleteRemark = async (remarkId) => {
  const token = localStorage.getItem("authToken");
  const res = await axios.delete(`${BASE_URL}/remarks/${remarkId}`, {
    headers: getAuthHeaders(),
  });
  return res.data.response;
};
