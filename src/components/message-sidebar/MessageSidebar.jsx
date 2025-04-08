import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageSidebar.css';
import { FiSearch } from 'react-icons/fi';
import { IoMdMore } from 'react-icons/io';
 
const defaultAvatar = "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg";
 
const MessageSidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
 
  // 🧪 TEMP: Hardcoded Bearer token (replace this with real token later)
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVOVE9SIiwic3ViIjoiaGFycmlzQGdtYWlsLmNvbSIsImlhdCI6MTc0NDA5Njg0OCwiZXhwIjoxNzQ0MTMyODQ4fQ.JxMlMDa-61ZcRadYqwf8NIAw410VpOsuSfnJPfGMwG2Np1KrPM8uAv5kitf_KDDAuO6aMXT0ttp63LkLaZi2ZQ";
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
 
        const usersFromApi = response.data.response; // ✅ Fix: use 'response' key
 
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
      <div className="search">
        <FiSearch className="search-icon" />
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