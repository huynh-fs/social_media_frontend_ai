import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const SOCKET_URL = 'http://localhost:5000';

export const socketService = {
  getSocket: () => socket,

  connect: (token: string, userId: string) => {
    if (socket) return socket;
    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      socket?.emit('addUser', userId);
    });
    return socket;
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
};

export default socketService;
