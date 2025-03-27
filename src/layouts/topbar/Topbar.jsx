import React from "react";
import Searchbar from '../../components/searchbar/Searchbar.jsx';
import User from '../../components/user/UserProfileDropdown.jsx';
import './Topbar.css';

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="search">
                <Searchbar />
            </div>
            <div className="user">
                <User />
            </div>
        </div>
    );
};

export default Topbar;
