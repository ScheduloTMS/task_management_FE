// services/messageService.js
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081'; 
const SOCKET_URL = `${BASE_URL}/ws`;
const API_BASE = `${BASE_URL}/api/messages`;

let stompClient = null;

const connectWebSocket = (onConnect, onMessage, currentUserEmail, token) => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = over(socket);

  stompClient.connect(
    {
      Authorization: `Bearer ${token}`
    },
    () => {
      console.log('🟢 WebSocket connected');

      const messagePath = `/user/${currentUserEmail}/queue/messages`;
      stompClient.subscribe(messagePath, (message) => {
        const payload = JSON.parse(message.body);
        console.log('📥 Message received:', payload);
        onMessage(payload);
      });

      if (onConnect) onConnect(); // history now handled via HTTP
    },
    (error) => {
      console.error('❌ WebSocket error:', error);
    }
  );
};

const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => console.log('🔌 WebSocket disconnected'));
  }
};

const sendMessage = (messageObj) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/chat', {}, JSON.stringify(messageObj));
  } else {
    console.warn('⚠️ WebSocket not connected');
  }
};


const fetchChatHistory = async (senderEmail, receiverEmail, token) => {
    try {
      const response = await axios.get(
        `${API_BASE}/history`,
        {
          params: { senderEmail, receiverEmail },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  };
  

const messageService = {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  fetchChatHistory
};

export default messageService;
