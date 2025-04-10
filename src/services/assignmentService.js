import axios from "axios";

export const getAssignedStudents = async (taskId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/assignments/${taskId}/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.response; 
  } catch (err) {
    console.error("Error fetching assigned students:", err);
    throw err;
  }
};