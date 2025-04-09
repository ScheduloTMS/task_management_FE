import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageSidebar.css';
import { FiSearch } from 'react-icons/fi';

const defaultAvatar = "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg";

const MessageSidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVOVE9SIiwic3ViIjoiaGFycmlzQGdtYWlsLmNvbSIsImlhdCI6MTc0NDE4MjQ0NywiZXhwIjoxNzQ0MjE4NDQ3fQ.TMMJv-vtV3KnHh7LOsPzZxmSiN5tpEFE9rpNPzqRHF5j9Oa_FuLqOnS1LmpneYOY8vptQ6nUcJHjAmX9fcaFiQ";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const usersFromApi = response.data.response;

        const enhancedUsers = usersFromApi.map((user) => ({
          ...user,
          id: user.userId,
          name: user.name,
          avatar: user.photo
            ? `data:image/jpeg;base64,${user.photo}`
            : defaultAvatar,
          lastMessage: "Click to start a conversation",
          lastMessageTime: "Now",
          unreadCount: 0
        }));

        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (onSelectUser) {
      onSelectUser(user);
    }
  };

  return (
    <div className="message-sidebar">
  <div className="message-search">
    <FiSearch className="message-search-icon" />
    <input
      type="text"
      placeholder="Search messages"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="users-list">
    {filteredUsers.map((user) => (
      <div
        key={user.id}
        className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
        onClick={() => handleUserSelect(user)}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="user-avatar"
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
        />
        <div className="user-info">
          <div className="user-info-top">
            <h3>{user.name}</h3>
            <span className="message-time">{user.lastMessageTime}</span>
          </div>
          <p className="last-message">{user.lastMessage}</p>
        </div>
        {user.unreadCount > 0 && (
          <span className="unread-badge">{user.unreadCount}</span>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default MessageSidebar;
