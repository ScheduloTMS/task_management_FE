import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        userId: username,  
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json", 
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
     
      console.error('Login failed with status:', error.response.status);
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      
      console.error('Login failed without response:', error.message);
      throw error;
    }
  }
};

export const changePassword = async (currentPassword, newPassword, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/profile`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
