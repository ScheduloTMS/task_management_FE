import React, { useState, useRef, useEffect } from "react";
import "./Note.css";
import { FaMinus } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { getNotes, createNote, updateNote, deleteNote } from "../../services/noteService";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
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
        setNotes([...notes, newNote]);
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
      const updatedNote = await updateNote(noteToUpdate.id, {
        ...noteToUpdate,
        completed: !noteToUpdate.completed
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
      await deleteNote(noteToDelete.id);
      setNotes(notes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (isLoading) {
    return <div className="notepad-container">Loading notes...</div>;
  }

  return (
    <div className="notepad-container">
      <h4>Notes</h4>
      <div className="date-header-container">
        <p className="date">
          {new Date().toLocaleDateString("en-GB", { 
            day: "2-digit", 
            month: "long", 
            year: "numeric" 
          })}
        </p>
        
        <div className="header">
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
          <li key={note.id || index} className={note.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleComplete(index)}
            />
            <span>{note.text}</span>
            {note.completed && (
              <button className="delete-btn" onClick={() => handleDeleteNote(index)}>
                <FaMinus />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;