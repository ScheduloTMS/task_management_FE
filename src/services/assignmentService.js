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
      
      const data = response.data.response;
      return Array.isArray(data) ? data : [data]; 
    } catch (error) {
      console.error("Error fetching assigned students:", error);
      throw error;
    }
  };

  export const submitAssignment = async (formData, token) => {
    try {
      const response = await axios.post("http://localhost:8081/api/assignments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting assignment:", error.response || error);
      throw error;
    }
  };