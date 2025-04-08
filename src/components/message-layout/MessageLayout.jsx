import React, { useState } from 'react';
import MessageSidebar from "../message-sidebar/MessageSidebar.jsx";
 
import MessageContent from '../message-content/MessageContent.jsx';
import './MessageLayout.css';
 
const MessageLayout = () => {
  const [selectedUser, setSelectedUser] = useState(null);
 
  return (
    <div className="message-layout">
      <MessageSidebar onSelectUser={setSelectedUser} />
      <MessageContent selectedUser={selectedUser} />
    </div>
  );
};
 
export default MessageLayout;