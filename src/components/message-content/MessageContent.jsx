import React, { useState, useRef, useEffect } from 'react';
import './MessageContent.css';
import { FiSend } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedFill } from 'react-icons/pi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import messageService from '../../services/messageService'; 

const MessageContent = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !selectedUser) {
      console.log("⛔ Missing currentUser or selectedUser");
      return;
    }

    // Fetch chat history
    messageService.getMessages(selectedUser.id)
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt));
        const formatted = sorted.map((msg) => ({
          id: msg.msgId || Date.now() + Math.random(),
          text: msg.content,
          sender: msg.senderId === currentUser.id ? 'me' : 'them',
          time: new Date(msg.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        }));
        setMessages(formatted);
        scrollToBottom();
      })
      .catch((err) => console.error('❌ Chat history error:', err));

    // Connect WebSocket
    messageService.connectWebSocket(
      () => console.log("🟢 WebSocket setup complete"),
      (received) => {
        setMessages((prev) => [
          ...prev,
          {
            id: received.msgId || Date.now(),
            text: received.content,
            sender: received.senderId === currentUser.id ? 'me' : 'them',
            time: new Date(received.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
          },
        ]);
      },
      currentUser.id
    );

    return () => {
      messageService.disconnectWebSocket();
    };
  }, [currentUser, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    const messageObj = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content: newMessage,
      sendAt: new Date().toISOString(),
    };

    messageService.sendMessage(messageObj);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      },
    ]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="message-content">
      {selectedUser ? (
        <>
          <div className="message-header">
            <div className="header-left">
              <img
                src={selectedUser.avatar || '/default-avatar.png'}
                alt={selectedUser.name}
                className="user-avatar"
                onError={(e) => (e.target.src = '/default-avatar.png')}
              />
              <div className="user-info">
                <h3>{selectedUser.name}</h3>
                <p className="status">Online</p>
              </div>
            </div>
            <button className="menu-btn">
              <BsThreeDotsVertical size={20} />
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
              >
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <div className="message-meta">
                    <span className="time">{message.time}</span>
                    {message.sender === 'me' && (
                      <span className="read-status">
                        {message.read ? (
                          <FaRegEye color="#53bdeb" />
                        ) : (
                          <PiEyeClosedFill color="#999" size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-input-container">
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              className="send-btn"
              disabled={!newMessage.trim()}
            >
              <FiSend size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="no-chat-selected">
          <h2>Select a chat to start messaging</h2>
          <p>Choose a contact from the sidebar to view messages</p>
        </div>
      )}
    </div>
  );
};

export default MessageContent;
