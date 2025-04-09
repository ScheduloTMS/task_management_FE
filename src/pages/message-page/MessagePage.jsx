import React from 'react';
import './MessagePage.css';
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TopbarLayout from "../../layouts/topbar/Topbar.jsx";
import MessageLayout from '../../components/message-layout/MessageLayout';

const MessagePage = () => {
  return (
    <div className="message-page">
      <Sidebar />
      <div className="main-content">
        <TopbarLayout />
        <MessageLayout />
      </div>
    </div>
  );
};

export default MessagePage;
