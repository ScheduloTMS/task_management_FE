import React from "react";
import { FaTh, FaList } from "react-icons/fa";  
import  "./BoardListButtons.css";

const BoardListButtons = ({ setViewMode }) => {
  return (
    <div className="board-list-toggle">
      <button
        onClick={() => setViewMode("kanban")}
        className="toggle-button"
      >
        <FaTh /> Board
      </button>
      <button
        onClick={() => setViewMode("list")}
        className="toggle-button"
      >
        <FaList /> List 
      </button>
    </div>
  );
};

export default BoardListButtons;
