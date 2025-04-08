import React, { useState } from "react";
import TaskBoard from "../../components/task-board/TaskBoard.jsx";
import { FaCalendarAlt, FaFilter } from "react-icons/fa";
import "./StudentList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentList = () => {
  const [viewMode, setViewMode] = useState("list"); 
  const [filter, setFilter] = useState("All");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  return (
    <div className="student-board-container">
      <div className="main-content">
        <div className="content-wrapper">

          <hr className="divider" />

          <div className="filters-container">
            
            <div className="filter-item">
              <button 
                className="filter-button"
                onClick={() => {
                  setShowStatusFilter(!showStatusFilter);
                  setShowWeekPicker(false);
                }}
              >
                <FaFilter />
                Filter
              </button>
              
              {showStatusFilter && (
                <div className="filter-dropdown">
                  <div 
                    className={`filter-option ${filter === "All" ? "selected" : ""}`}
                    onClick={() => {
                      setFilter("All");
                      setShowStatusFilter(false);
                    }}
                  >
                    All 
                  </div>
                  <div 
                    className={`filter-option ${filter === "To Do" ? "selected" : ""}`}
                    onClick={() => {
                      setFilter("To Do");
                      setShowStatusFilter(false);
                    }}
                  >
                    To Do
                  </div>
                  <div 
                    className={`filter-option ${filter === "In Progress" ? "selected" : ""}`}
                    onClick={() => {
                      setFilter("In Progress");
                      setShowStatusFilter(false);
                    }}
                  >
                    In Progress
                  </div>
                  <div 
                    className={`filter-option ${filter === "Completed" ? "selected" : ""}`}
                    onClick={() => {
                      setFilter("Completed");
                      setShowStatusFilter(false);
                    }}
                  >
                    Completed
                  </div>
                  <div 
                    className={`filter-option ${filter === "Overdue" ? "selected" : ""}`}
                    onClick={() => {
                      setFilter("Overdue");
                      setShowStatusFilter(false);
                    }}
                  >
                    Overdue
                  </div>
                </div>
              )}
            </div>

            
            <div className="filter-item">
              <button 
                className="filter-button"
                onClick={() => {
                  setShowWeekPicker(!showWeekPicker);
                  setShowStatusFilter(false);
                }}
              >
                <FaCalendarAlt />
                {selectedWeek 
                  ? formatWeekRange(selectedWeek)
                  : "Select Week"}
              </button>
              
              {showWeekPicker && (
                <div className="calendar-dropdown">
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


function formatWeekRange(startOfWeek) {
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  const formatOptions = { month: 'short', day: 'numeric' };
  return `${startOfWeek.toLocaleDateString(undefined, formatOptions)} - ${endOfWeek.toLocaleDateString(undefined, formatOptions)}`;
}

export default StudentList;