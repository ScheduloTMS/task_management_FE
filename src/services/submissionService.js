import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};


export const fetchAssignmentDetails = async (taskId, studentId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/assignments/${taskId}/${studentId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data.response;
  } catch (error) {
    console.error("Error fetching assignment details:", error);
    throw error; 
  }
};


export const submitAssignmentScore = async (taskId, userId, score) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/assignments`,
      null,
      {
        params: {
          taskId,
          userId: userId, 
          score
        },
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Submission error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      config: error.config
    });
    throw error;
  }
};
