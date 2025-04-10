// services/remarksService.js
import axios from "axios";

const API_BASE_URL = "/api/tasks";

export const fetchRemarks = async (taskId, token) => {
  const response = await axios.get(`${API_BASE_URL}/${taskId}/remarks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // assuming your response has `.data.data` structure from ApiResponse
};

export const postRemark = async (taskId, comment, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/${taskId}/remarks`,
    null,
    {
      params: { comment },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
