import React, { useState } from "react";
import './Searchbar.css';
import { FaSearch } from "react-icons/fa";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

const SearchBarWithDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false); 

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSearch = () => {
    setIsSearchActive(false); 
  };

  const handleSearchIconClick = () => {
    if (!isSearchActive) {
      setIsSearchActive(true); 
    }
  };

  return (
    <div className={`search-container ${darkMode ? "dark" : "light"}`}>
      <div className={`search-bar ${darkMode ? "dark" : "light"}`}>
        <FaSearch 
          className={`search-icon ${darkMode ? "dark" : "light"}`}
          onClick={handleSearchIconClick}
        />
        {isSearchActive && (
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={handleSearch} 
            className={`search-input ${darkMode ? "dark" : "light"}`}
          />
        )}
      </div>
      <div className={`dark-mode-toggle ${darkMode ? "dark" : "light"}`} onClick={toggleDarkMode}>
        {darkMode ? <RiSunLine /> : <RiMoonClearLine />}
      </div>
    </div>
  );
};

export default SearchBarWithDarkMode;
