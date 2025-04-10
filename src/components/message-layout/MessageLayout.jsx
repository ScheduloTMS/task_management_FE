import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from "../../states/authState";

import MessageSidebar from "../message-sidebar/MessageSidebar.jsx";
import MessageContent from '../message-content/MessageContent.jsx';
import './MessageLayout.css';

const MessagesLayout = () => {
  const auth = useRecoilValue(authState);

  const loggedInUser = {
    id: auth?.id, 
  };

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
