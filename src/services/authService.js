import axios from "axios";

const API_URL = "http://localhost:8081/api";

// User Login
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

// Change Password
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

export const logoutUser = async (token) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensure cookies/session are handled correctly
        }
      );
  
      console.log("Logout API Response:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
  
      // Check if there's a response from the server
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        throw new Error(error.response.data.message || "Logout failed.");
      } else {
        console.error("No response from server (Network error).");
        throw new Error("Network error. Unable to reach server.");
      }
    }
  };
  
