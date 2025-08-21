import { io, Socket } from "socket.io-client";

// ✨ BIẾN NÀY LÀ DUY NHẤT TRÊN TOÀN BỘ APP ✨
let socket: Socket | null = null;

const SOCKET_URL = "http://localhost:5000";

export const socketService = {
  // Hàm này luôn trả về cùng một instance `socket`
  getSocket: () => socket,

  connect: (token: string, userId: string) => {
    // Chỉ tạo kết nối mới nếu chưa có hoặc đã ngắt kết nối
    if (socket && socket.connected) {
      console.log("Socket already connected.");
      return socket;
    }

    // Ngắt kết nối cũ (nếu có) để đảm bảo sạch sẽ
    if (socket) {
      socket.disconnect();
    }

    console.log("Attempting to connect socket...");
    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      // Tự động kết nối lại
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log(`Socket connected with ID: ${socket?.id}. Emitting addUser.`);
      socket?.emit("addUser", userId);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    return socket;
  },

  disconnect: () => {
    if (socket) {
      console.log("Disconnecting socket...");
      socket.disconnect();
      socket = null;
    }
  },

  on: (eventName: string, callback: (...args: any[]) => void) => {
    // Lắng nghe sự kiện trên instance duy nhất
    socket?.on(eventName, callback);
  },

  off: (eventName: string, callback: (...args: any[]) => void) => {
    // Gỡ bỏ listener khỏi instance duy nhất
    socket?.off(eventName, callback);
  },

  emit: (eventName: string, data: any) => {
    // Gửi sự kiện qua instance duy nhất
    socket?.emit(eventName, data);
  },
};
