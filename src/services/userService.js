import axios from "axios";

const API_URL = "http://localhost:8081/api";


export const updateUserProfilePhoto = async (photo, token) => {
  
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await axios.put(
    `${API_URL}/users/profile`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const fetchAllStudents = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.response.filter(user => user.role === "STUDENT");
  } catch (error) {
    console.error("Error fetching students:", error.response || error.message);
    throw error;
  }
};



export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.response; 
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};


export const createUser = async (userData) => 
{
const token = localStorage.getItem("authToken");
console.log("Sending token:", token); // Should NOT be undefined

const response = await axios.post(
  "http://localhost:8081/api/users",
  userData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

  try {
    console.log("Making POST request to:", `${API_URL}/users`);
    const response = await axios.post(`${API_URL}/users`, userData, 
      {
      headers: {

        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Raw API response:", response);
    return response.data.response;
  } catch (error) {
    console.error("Error creating user:", error?.response || error.message);
    throw error;
  }
};
