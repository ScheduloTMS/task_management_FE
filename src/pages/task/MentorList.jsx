import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TaskBoard from "../../components/task-board/TaskBoard.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import BoardListButtons from "../../components/button/BoardListButtons.jsx";
import { FaCalendarAlt, FaFilter } from "react-icons/fa";
import "./MentorList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoPeople } from "react-icons/io5";
import { editTask, deleteTask } from "../../services/taskService";

const MentorList = () => {
  const [viewMode, setViewMode] = useState("list"); 
  const [filter, setFilter] = useState("All");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const token = localStorage.getItem("authToken");

  
  const handleEditTask = async (taskId, updatedData) => {
    try {
      await editTask(taskId, updatedData, token);
      alert("Task updated successfully");
    } catch (err) {
      console.error("Edit failed", err);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId, token);
      alert("Task deleted successfully");
      // Optionally: re-fetch task list here
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="mentor-board-container">
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
                  {["All", "To Do", "In Progress", "Completed", "Overdue"].map((status) => (
                    <div 
                      key={status}
                      className={`filter-option ${filter === status ? "selected" : ""}`}
                      onClick={() => {
                        setFilter(status);
                        setShowStatusFilter(false);
                      }}
                    >
                      {status}
                    </div>
                  ))}
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
                isMentor={true}
                onEditTask={handleEditTask}   // 🟡 Step 3
                onDeleteTask={handleDeleteTask} // 🟡 Step 3
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

export default MentorList;
