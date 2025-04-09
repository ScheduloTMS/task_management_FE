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

export const getAssignedStudents = async (taskId, token) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/assignments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // response.data.response might be an object (if only one assignment)
      const data = response.data.response;
      return Array.isArray(data) ? data : [data]; // wrap object in array if needed
    } catch (error) {
      console.error("Error fetching assigned students:", error);
      throw error;
    }
  };