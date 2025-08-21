import React from 'react';
import { useChatStore } from '../stores/chatStore';
import { ChatBox } from './ChatBox';

export const ChatTabs: React.FC = () => {
  const openChatSessions = useChatStore((state) => state.openChatSessions);
  const sessionValues = Object.values(openChatSessions);

  if (sessionValues.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-4 flex items-end space-x-4 z-50">
      {sessionValues.map((session) => (
        <ChatBox key={session.participant._id} session={session} />
      ))}
    </div>
  );
};