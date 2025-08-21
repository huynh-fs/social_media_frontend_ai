import React, { useRef, useEffect } from "react";
import { useAuthStore } from "../../../stores/authStore";
import { IMessage } from "../types";
import { Spinner } from "@/components/common/Spinner";

type ChatBoxMessagesProps = {
  messages: IMessage[];
  isLoadingHistory: boolean;
};

export const ChatBoxMessages: React.FC<ChatBoxMessagesProps> = ({
  messages,
  isLoadingHistory,
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  if (isLoadingHistory) {
    return (
      <div className="flex-grow p-4 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="flex-grow p-4 overflow-y-auto scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex mb-2 ${
            msg.sender._id === currentUser?._id
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`px-3 py-2 rounded-lg max-w-xs ${
              msg.sender._id === currentUser?._id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
