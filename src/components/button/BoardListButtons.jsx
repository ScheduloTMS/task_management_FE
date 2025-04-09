import React from "react";
import { FaList } from "react-icons/fa";
import { LuSquareKanban } from "react-icons/lu";
import "./BoardListButtons.css";

const BoardListButtons = ({ viewMode, setViewMode }) => {
  return (
    <div className="board-list-toggle">
      <button
        onClick={() => setViewMode("list")}
        className={`toggle-button ${viewMode === "list" ? "active" : ""}`}
      >
        <FaList /> List
      </button>
      <button
        onClick={() => setViewMode("kanban")}
        className={`toggle-button ${viewMode === "kanban" ? "active" : ""}`}
      >
        <LuSquareKanban/> Board
      </button>
    </div>
  );
};

export default BoardListButtons;