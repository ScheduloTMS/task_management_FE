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


