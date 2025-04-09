import axios from 'axios';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const SOCKET_URL = 'https://localhost:8080/ws'; // 👈 WebSocket endpoint

let stompClient = null;

const connectWebSocket = (onConnect, onMessage, currentUserId) => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = over(socket);

  stompClient.connect({}, () => {
    console.log('✅ WebSocket connected');

    const subscriptionPath = `/user/${currentUserId}/queue/messages`;

    stompClient.subscribe(subscriptionPath, (message) => {
      const payload = JSON.parse(message.body);
      console.log('📩 Message received from server:', payload);
      onMessage(payload);
    });

    if (onConnect) onConnect();
  }, (error) => {
    console.error('❌ WebSocket connection failed:', error);
  });
};

const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log('🔌 WebSocket disconnected');
    });
  }
};

const sendMessage = (messageObj) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/chat', {}, JSON.stringify(messageObj));
  } else {
    console.warn('⚠️ WebSocket is not connected');
  }
};

const getMessages = async (receiverId) => {
  const response = await axios.get(`https://localhost:8080/api/messages`, {
    params: { receiverId },
  });
  return response.data;
};

const messageService = {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  getMessages,
};

export default messageService;
