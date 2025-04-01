import React, { useState } from "react";
import "./Searchbar.css";
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
    if (searchQuery.trim() !== "") {
      console.log("Searching for:", searchQuery);
      setIsSearchActive(false); 
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchActive(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`search-container ${darkMode ? "dark" : "light"}`}>
      <div className={`search-bar ${darkMode ? "dark" : "light"}`} onClick={handleSearchIconClick}>
        <FaSearch 
          className={`search-icon ${darkMode ? "dark" : "light"}`}
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`search-input ${darkMode ? "dark" : "light"}`}
          autoFocus={isSearchActive}
        />
      </div>
      <div className={`dark-mode-toggle ${darkMode ? "dark" : "light"}`} onClick={toggleDarkMode}>
        {darkMode ? <RiSunLine /> : <RiMoonClearLine />}
      </div>
    </div>
  );
};

export default SearchBarWithDarkMode;
