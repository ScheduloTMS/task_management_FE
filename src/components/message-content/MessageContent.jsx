// components/MessageContent.jsx
import React, { useState, useRef, useEffect } from 'react';
import './MessageContent.css';
import { FiSend } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedFill } from 'react-icons/pi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";
import messageService from '../../services/messageService';

const MessageContent = ({ selectedUser, currentUser }) => {
  const { token } = useRecoilValue(authState);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const initWebSocket = () => {
      messageService.connectWebSocket(
        () => {
          console.log("🟢 WebSocket connected");
        },
        (received) => {
          setMessages((prev) => [
            ...prev,
            {
              id: received.msgId || Date.now(),
              text: received.content,
              sender: received.senderEmail === currentUser.email ? 'me' : 'them',
              time: new Date(received.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              read: false,
            },
          ]);
          scrollToBottom();
        },
        currentUser.email,
        token
      );
    };

    const fetchHistory = async () => {
      const history = await messageService.fetchChatHistory(currentUser.email, selectedUser.email, token);
      const formatted = history.map((msg) => ({
        id: msg.msgId || Date.now() + Math.random(),
        text: msg.content,
        sender: msg.senderEmail === currentUser.email ? 'me' : 'them',
        time: new Date(msg.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: msg.read || false,
      }));
      setMessages(formatted);
      scrollToBottom();
    };

    initWebSocket();
    fetchHistory();

    return () => {
      messageService.disconnectWebSocket();
    };
  }, [currentUser, selectedUser, token]);

  useEffect(() => {
    setMessages([]);
    setNewMessage("");
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      senderEmail: currentUser.email,
      receiverEmail: selectedUser.email,
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="message-input"
            />
            <button onClick={handleSendMessage} className="send-btn" disabled={!newMessage.trim()}>
              <FiSend size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="no-chat-selected">
          <h2>Select a chat to start messaging</h2>
        </div>
      )}
    </div>
  );
};

export default MessageContent;
