import React, { useState } from "react";
import './Searchbar.css';
import { FiSearch } from "react-icons/fi";
import { RiMoonClearLine ,RiSunLine } from "react-icons/ri";

const SearchBarWithDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`search-container ${darkMode ? "dark" : "light"}`}>
      <div className={`search-bar ${darkMode ? "dark" : "light"}`}>
        <FiSearch className={`search-icon ${darkMode ? "dark" : "light"}`} />
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`search-input ${darkMode ? "dark" : "light"}`}
        />
      </div>
      <div className={`dark-mode-toggle ${darkMode ? "dark" : "light"}`} onClick={toggleDarkMode}>
        {darkMode ? <RiSunLine /> : <RiMoonClearLine/>}
      </div>
    </div>
  );
};

export default SearchBarWithDarkMode;