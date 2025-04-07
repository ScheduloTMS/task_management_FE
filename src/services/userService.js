import axios from "axios";


export const updateUserProfilePhoto = async (photo, token) => {
  
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await axios.put(
    "http://localhost:8081/api/users/profile",
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
    const res = await axios.get("http://localhost:8081/api/users", {
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



