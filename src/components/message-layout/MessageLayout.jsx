import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState"; 

import MessageSidebar from "../message-sidebar/MessageSidebar.jsx";
import MessageContent from "../message-content/MessageContent.jsx";
import './MessageLayout.css';

const MessagesLayout = () => {
  const { token } = useRecoilValue(authState);

  let loggedInUser = {};
  if (token) {
    const decoded = jwtDecode(token);
    loggedInUser = {
      email: decoded.sub,   
      role: decoded.role
    };
  }

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messages-page">
      <MessageSidebar onSelectUser={setSelectedUser} />
      <MessageContent
        currentUser={loggedInUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default MessagesLayout;
