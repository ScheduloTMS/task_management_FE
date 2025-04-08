import React, { useState, useRef, useEffect } from "react";
import "./Note.css";
import { FaMinus } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../../services/noteService";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        fetchedNotes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowInput(false);
        setInput("");
      }
    };

    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]);

  const handleAddNote = async (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      try {
        const newNote = await createNote(input.trim());
        setNotes([newNote, ...notes]);
        setInput("");
        setShowInput(false);
      } catch (error) {
        console.error("Failed to create note:", error);
      }
    }
  };

  const toggleComplete = async (index) => {
    const noteToUpdate = notes[index];
    try {
      const updatedNote = await updateNote(noteToUpdate.noteId, {
        ...noteToUpdate,
        completed: !noteToUpdate.completed,
      });

      const updatedNotes = notes.map((note, i) =>
        i === index ? updatedNote : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleDeleteNote = async (index) => {
    const noteToDelete = notes[index];
    try {
      await deleteNote(noteToDelete.noteId);
      setNotes(notes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(notes[index].noteText);
  };

  const saveEdit = async (index) => {
    const noteToUpdate = notes[index];
    try {
      const updatedNote = await updateNote(noteToUpdate.noteId, {
        ...noteToUpdate,
        noteText: editText,
      });

      const updatedNotes = notes.map((note, i) =>
        i === index ? updatedNote : note
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to update note text:", error);
    }
  };

  if (isLoading) {
    return <div className="notepad-container">Loading notes...</div>;
  }

  return (
    <div className="notepad-container">
      <div className="date-header-container">
        <div className="header">
          <h5>Notes</h5>
          <button
            ref={buttonRef}
            className="add-btn"
            onClick={() => setShowInput(true)}
          >
            <IoMdAddCircle />
          </button>
        </div>
      </div>

      {showInput && (
        <input
          ref={inputRef}
          type="text"
          className="note-input"
          placeholder="Write a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleAddNote}
          autoFocus
        />
      )}

      <ul className="note-list">
        {notes.map((note, index) => (
          <li
            key={note.noteId}
            className={`note-item ${note.completed ? "completed" : ""}`}
          >
            <div className="note-content">
              <input
                type="checkbox"
                checked={note.completed}
                onChange={() => toggleComplete(index)}
                className="note-checkbox"
              />

              {editingIndex === index ? (
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(index);
                  }}
                  autoFocus
                />
              ) : (
                <span className="note-text">{note.noteText}</span>
              )}

              <div className="action-buttons">
                {editingIndex === index ? (
                  <button className="save-btn" onClick={() => saveEdit(index)}>
                    <IoCheckmarkDoneSharp />
                  </button>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(index)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteNote(index)}
                    >
                      <FaMinus />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="timestamp">
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;