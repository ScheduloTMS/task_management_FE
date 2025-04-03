import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/notes';

// Get all notes for the current user
export const getNotes = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      withCredentials: true // Include cookies for authentication
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Create a new note
export const createNote = async (noteText) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      text: noteText,
      completed: false
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update a note
export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${noteId}`, updatedNote, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Delete a note (soft delete)
export const deleteNote = async (noteId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${noteId}`, {
      withCredentials: true
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};