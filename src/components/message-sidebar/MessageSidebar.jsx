import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState"; 
import { getAllUsers } from "../../services/userService"; 
import './MessageSidebar.css';
import { FiSearch } from 'react-icons/fi';

const defaultAvatar = "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg";

const MessageSidebar = ({ onSelectUser }) => {
  const { token } = useRecoilValue(authState);  
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromApi = await getAllUsers(token); 
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

    if (token) fetchUsers(); 
  }, [token]);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (onSelectUser) onSelectUser(user);
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