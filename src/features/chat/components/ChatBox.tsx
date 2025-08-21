import React from 'react';
import { useChatStore } from '../stores/chatStore';
import { IChatSession } from '../types';
import { useChat } from '../hooks/useChat';
import { ChatBoxHeader } from './ChatBoxHeader';
import { ChatBoxMessages } from './ChatBoxMessages';
import { ChatBoxInput } from './ChatBoxInput';

type ChatBoxProps = {
  session: IChatSession;
};

export const ChatBox: React.FC<ChatBoxProps> = ({ session }) => {
  const { closeChat } = useChatStore((state) => state.actions);
  
  // Hook `useChat` đã "biết" người nhận là `session.participant`
  const { sendMessage, isLoadingHistory } = useChat(session.participant);

  const handleSendMessage = (content: string) => {
    // Chỉ cần truyền nội dung tin nhắn.
    // Hook `useChat` sẽ tự động biết người nhận là ai.
    sendMessage(content); 
  };
  
  return (
    <div className="w-80 h-96 flex flex-col bg-white rounded-t-lg shadow-lg border">
      <ChatBoxHeader 
        participant={session.participant} 
        onClose={() => closeChat(session.participant._id)} 
      />
      <ChatBoxMessages messages={session.messages} isLoadingHistory={isLoadingHistory} />
      <ChatBoxInput onSendMessage={handleSendMessage} />
    </div>
  );
};