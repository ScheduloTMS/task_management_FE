import React from "react";
import Searchbar from '../../components/searchbar/Searchbar.jsx';
<<<<<<< HEAD
import User from '../../components/user/UserProfileDropdown.jsx';
=======
import User from '../../components/user/User.jsx';
>>>>>>> 1cfd6d6f4ab0187746be16e5f0f80cae4af34c5e
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

