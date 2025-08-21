import React, { useState } from "react";
import { useChatStore } from "../stores/chatStore";
import { IChatSession } from "../types";
import { useChat } from "../hooks/useChat";
import { ChatBoxHeader } from "./ChatBoxHeader";
import { ChatBoxMessages } from "./ChatBoxMessages";
import { ChatBoxInput } from "./ChatBoxInput";

type ChatBoxProps = {
  session: IChatSession;
};

export const ChatBox: React.FC<ChatBoxProps> = ({ session }) => {
  const { closeChat, markSessionAsSeen } = useChatStore(
    (state) => state.actions,
  );

  // Hook `useChat` đã "biết" người nhận là `session.participant`
  const { sendMessage, isLoadingHistory } = useChat(session.participant);

  // ✨ 1. Thêm state để quản lý việc box chat có đang mở rộng hay không
  const [isMinimized, setIsMinimized] = useState(false);

  const handleHeaderClick = () => {
    // ✨ 2. Khi click header: Đánh dấu là đã xem và/hoặc thu nhỏ/mở rộng
    handleInteraction();
    setIsMinimized(!isMinimized);
  };

  const handleInteraction = () => {
    // ✨ 1. Tạo một hàm xử lý tương tác chung
    // Bất kể người dùng click vào header hay focus vào input,
    // đều coi như họ đã "xem" cuộc trò chuyện.
    markSessionAsSeen(session.participant._id);
  };

  const handleSendMessage = (content: string) => {
    // Chỉ cần truyền nội dung tin nhắn.
    // Hook `useChat` sẽ tự động biết người nhận là ai.
    sendMessage(content);
  };

  return (
    <div
      className="w-80 h-96 flex flex-col bg-white rounded-t-lg shadow-lg border"
      onClick={handleHeaderClick}
    >
      <ChatBoxHeader
        participant={session.participant}
        hasUnseenMessages={session.hasUnseenMessages || false}
        onClick={handleHeaderClick}
        onClose={() => closeChat(session.participant._id)}
      />
      <ChatBoxMessages
        messages={session.messages}
        isLoadingHistory={isLoadingHistory}
      />
      <ChatBoxInput
        onSendMessage={handleSendMessage}
        onFocus={handleInteraction}
      />
    </div>
  );
};
