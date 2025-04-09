import axios from "axios";



export const assignStudents = async (taskId, studentIds, token) => {
    
  try {
    const response = await axios.post(
      `http://localhost:8081/api/assignments/${taskId}/assign`,
      {studentIds}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response;
  } catch (err) {
    console.error("Error assigning students:", err.response);
    throw err;
  }
};