import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../stores/chatStore";
import { socketService } from "../../../sockets/socketService";
import { IChatUser, IMessage } from "../types";
import { useAuthStore } from "../../../stores/authStore";
import { fetchMessages } from "../../../api/chatService"; // ✨ Import hàm API

export const useChat = (participant: IChatUser) => {
  const { setMessages, addMessage } = useChatStore((state) => state.actions);
  const currentUser = useAuthStore((state) => state.user);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Lưu ID tạm thời của tin nhắn lạc quan
  const optimisticIdRef = useRef<string | null>(null);

  // Gửi tin nhắn qua socket
  const sendMessage = (content: string) => {
    const socket = socketService.getSocket();
    console.log("Sending message in hook:", content);
    if (!socket || !currentUser) return;

    // Tạo ID tạm thời
    const tempId = `optimistic_${Date.now()}`;
    optimisticIdRef.current = tempId; // Lưu ID tạm thời

    const optimisticMessage: IMessage = {
      _id: tempId,
      sender: {
        _id: currentUser._id,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
      },
      receiver: participant,
      content,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // Đánh dấu là tin nhắn lạc quan
    };

    // Thêm tin nhắn lạc quan vào UI
    addMessage(optimisticMessage);

    // Gửi sự kiện lên server
    socket.emit("send_message", {
      receiverId: participant._id,
      content,
    });
  };

  // ✨ Fetch tin nhắn cũ khi box chat được mở lần đầu
  useEffect(() => {
    const getMessageHistory = async () => {
      // Chỉ fetch nếu chưa có tin nhắn nào trong state
      const currentSession =
        useChatStore.getState().openChatSessions[participant._id];
      if (currentSession && currentSession.messages.length > 0) {
        return;
      }

      setIsLoadingHistory(true);
      try {
        const messages = await fetchMessages(participant._id);
        setMessages(participant._id, messages);
      } catch (error) {
        console.error("Failed to fetch message history", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    getMessageHistory();
  }, [participant._id, setMessages]);

  return { sendMessage, isLoadingHistory };
};
