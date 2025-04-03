import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TaskBoard from "../../components/task-board/TaskBoard.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import BoardListButtons from "../../components/button/BoardListButtons.jsx";
import { FaCalendarAlt } from "react-icons/fa";
import "./StudentList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentList = () => {
  const [viewMode, setViewMode] = useState("list"); 
  const [filter, setFilter] = useState("All");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [showWeekPicker, setShowWeekPicker] = useState(false);

  return (
    <div className="student-board-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      <div className="main-content">
        <TopbarLayout />

        <div className="content-wrapper">
          <div className="board-list-buttons">
            <BoardListButtons setViewMode={setViewMode} /> 
          </div>

          <hr className="divider" />

          <div className="filters-container">
            {/* Status Filter */}
            <div className="filter-item">
              <label htmlFor="taskFilter">Filter by Status:</label>
              <select
                id="taskFilter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            {/* Week Picker */}
            <div className="filter-item week-picker">
              <button 
                className="calendar-button"
                onClick={() => setShowWeekPicker(!showWeekPicker)}
              >
                <FaCalendarAlt />
                {selectedWeek 
                  ? formatWeekRange(selectedWeek)
                  : "Select Week"}
              </button>
              
              {showWeekPicker && (
                <div className="calendar-popover">
                  <DatePicker
                    selected={selectedWeek}
                    onChange={(date) => {
                      setSelectedWeek(date);
                      setShowWeekPicker(false);
                    }}
                    onWeekSelect={(date) => {
                      setSelectedWeek(date);
                      setShowWeekPicker(false);
                    }}
                    showWeekPicker
                    inline
                    calendarClassName="custom-calendar"
                    shouldCloseOnSelect={false}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="board-content">
            {viewMode === "list" ? (
              <TaskBoard 
                filter={filter}
                selectedWeek={selectedWeek}
              /> 
            ) : (
              <div className="list-view">
                <h2>List View</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function
function formatWeekRange(startOfWeek) {
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  const formatOptions = { month: 'short', day: 'numeric' };
  return `${startOfWeek.toLocaleDateString(undefined, formatOptions)} - ${endOfWeek.toLocaleDateString(undefined, formatOptions)}`;
}

export default StudentList;