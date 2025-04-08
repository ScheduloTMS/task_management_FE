import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import Team from "../../components/team/Team.jsx";
 import "./TeamPage.css"; 

const TeamPage = () => {
  return (
    <div className="team-page">
      <Sidebar />
      <div className="main-content">
        <TopbarLayout />
        <div className="page-body">
          <Team />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;