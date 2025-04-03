import React from "react";
import { FaList } from "react-icons/fa";  
import { LuSquareKanban } from "react-icons/lu";
import "./BoardListButtons.css";

const BoardListButtons = ({ setViewMode }) => {
  return (
    <div className="board-list-toggle">
      <button onClick={() => setViewMode("kanban")} className="toggle-button">
        <LuSquareKanban size={18} /> Board
      </button>
      <button onClick={() => setViewMode("list")} className="toggle-button">
        <FaList size={18} /> List
      </button>
    </div>
  );
};

export default BoardListButtons;
