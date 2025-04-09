import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Team from "../../components/team/Team.jsx";
import "./TeamPage.css";

const TeamPage = () => {
  return (
    <div className="teampage-container">
      <Sidebar className="sidebar" />

      <div className="teampage-content">
        <TopbarLayout />
        <h2 className="hello">Meet the Team</h2>

        <div className="teampage-body">
          <Team />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
