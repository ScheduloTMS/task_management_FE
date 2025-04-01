import React, { useState, useRef, useEffect } from "react";
import "./Note.css";
import { FaMinus } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  
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

  const handleAddNote = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setNotes([...notes, { text: input, completed: false }]);
      setInput("");
      setShowInput(false);
    }
  };

  const toggleComplete = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, completed: !note.completed } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

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
          <li key={index} className={note.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleComplete(index)}
            />
            <span>{note.text}</span>
            {note.completed && (
              <button className="delete-btn" onClick={() => deleteNote(index)}>
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