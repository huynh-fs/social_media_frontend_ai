import React, { useState } from 'react';

type ChatBoxInputProps = {
  onSendMessage: (content: string) => void;
  onFocus: () => void;
};

export const ChatBoxInput: React.FC<ChatBoxInputProps> = ({ onSendMessage, onFocus }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
        console.log('Sending message:', content);
      onSendMessage(content.trim());
      setContent('');
    }
  };

  return (
    <div className="p-2 border-t">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={onFocus}
          placeholder="Type a message..."
          className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};