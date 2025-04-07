import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/notes";

const logDetailedError = (error, action) => {
  console.error(`❌ Error ${action}:`);

  if (error.response) {
    console.error(`➡️ Status: ${error.response.status}`);
    console.error(`➡️ Data:`, error.response.data);
    console.error(`➡️ Headers:`, error.response.headers);
  } else if (error.request) {
    console.error(`🚫 No response received. Request was:`, error.request);
  } else {
    console.error(`⚠️ Error setting up request:`, error.message);
  }

  console.error(`🛠 Axios config:`, error.config);
};

export const getNotes = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    logDetailedError(error, "fetching notes");
    throw error;
  }
};

export const createNote = async (noteText) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      API_BASE_URL,
      { noteText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    logDetailedError(error, "creating note");
    throw error;
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(
      `${API_BASE_URL}/${noteId}`,
      {
        ...updatedNote,
        updatedAt: new Date().toISOString() 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    logDetailedError(error, "updating note");
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`${API_BASE_URL}/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    logDetailedError(error, "deleting note");
    throw error;
  }
};
