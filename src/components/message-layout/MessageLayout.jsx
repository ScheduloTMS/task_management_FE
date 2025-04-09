
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import MessageSidebar from "../message-sidebar/MessageSidebar.jsx";
 
import MessageContent from '../message-content/MessageContent.jsx';
import './MessageLayout.css';

const MessagesLayout = () => {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVOVE9SIiwic3ViIjoiaGFycmlzQGdtYWlsLmNvbSIsImlhdCI6MTc0NDE4MjQ0NywiZXhwIjoxNzQ0MjE4NDQ3fQ.TMMJv-vtV3KnHh7LOsPzZxmSiN5tpEFE9rpNPzqRHF5j9Oa_FuLqOnS1LmpneYOY8vptQ6nUcJHjAmX9fcaFiQ";

  const decoded = jwtDecode(token);
  const loggedInUser = {
    id: decoded.sub,
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