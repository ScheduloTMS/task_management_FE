import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './MessageContent.css';
import { FiSend } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedFill } from "react-icons/pi";
import { BsThreeDotsVertical } from 'react-icons/bs';
 
const MessageContent = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
 
 
  useEffect(() => {
    console.log("Selected user is:", selectedUser);
  }, [selectedUser]);
const token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVOVE9SIiwic3ViIjoiaGFycmlzQGdtYWlsLmNvbSIsImlhdCI6MTc0NDEwNTI0MCwiZXhwIjoxNzQ0MTQxMjQwfQ.LpXL7Od3K_CZqhlPtTA_dBfgFmoavjCqMv9WYpR20cWGkSgB14cQdIipxlrBvDEXCjtUwyhhnFYlWpRfK8LUNg";
useEffect(() => {
  if (!currentUser) return;

  const stompClient = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    debug: (str) => console.log('STOMP Debug:', str),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('✅ Connected to WebSocket');
      
      stompClient.subscribe('/user/queue/messages', (message) => {
        const received = JSON.parse(message.body);
        console.log('📩 Received message:', received);

        setMessages(prev => [...prev, {
          id: Date.now(),
          text: received.content,
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        }]);
      });
    },
    onStompError: (frame) => {
      console.error('❌ STOMP Error:', frame);
    },
    onWebSocketError: (error) => {
      console.error('WebSocket Error:', error);
    },
    onWebSocketClose: (event) => {
      console.log('WebSocket Connection Closed:', event);
    },
  });

  stompClient.activate();
  stompClientRef.current = stompClient;

  return () => {
    stompClient.deactivate();
  };
}, [currentUser]);

 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
 
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !currentUser || !stompClientRef.current) return;
 
    const messageObj = {
      content: newMessage,
      receiverId: selectedUser.id,
    };
 
    try {
      stompClientRef.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(messageObj)
      });
 
      const msg = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
 
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
    } catch (error) {
      console.error('⚠️ Error sending message:', error);
    }
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