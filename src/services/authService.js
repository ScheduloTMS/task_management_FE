import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email, password,
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

export const changePassword = async (currentPassword, newPassword, confirmPassword, token) => {
  const formData = new FormData();
  formData.append("currentPassword", currentPassword);
  formData.append("newPassword", newPassword);
  formData.append("confirmPassword", confirmPassword);

  const response = await axios.put(`${API_URL}/users/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.response; 
  } catch (error) {
    console.error("Fetching user profile failed:", error);
    throw new Error("Unable to fetch user profile.");
  }
};



