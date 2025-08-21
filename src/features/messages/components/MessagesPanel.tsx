import React from "react";
import { useFetchConversations } from "../../chat/hooks/useFetchConversations";
import { Spinner } from "../../../components/common/Spinner";
import { useChatStore } from "../../chat/stores/chatStore";
import { IConversation } from "../../chat/types";

// Component con để hiển thị một cuộc trò chuyện
const ConversationItem: React.FC<{ conversation: IConversation }> = ({
  conversation,
}) => {
  const { openChat } = useChatStore((state) => state.actions);

  const handleItemClick = () => {
    // Khi click, mở box chat tương ứng
    openChat(conversation.participant);
  };

  return (
    <li
      onClick={handleItemClick}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
    >
      <img
        src={
          conversation.participant.avatarUrl ||
          "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
        }
        alt={conversation.participant.username}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="font-bold truncate">
            {conversation.participant.username}
          </p>
          <p className="text-xs text-gray-500 flex-shrink-0">
            {/* Có thể dùng thư viện như `date-fns` để định dạng thời gian đẹp hơn */}
            {new Date(conversation.lastMessage.createdAt).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" },
            )}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 truncate">
            {conversation.lastMessage.content}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

const MessagesPanel: React.FC = () => {
  const { conversations, isLoading, error } = useFetchConversations();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500 p-4">{error}</p>;
    }

    if (conversations.length === 0) {
      return (
        <p className="text-center text-gray-500 p-4">
          No recent conversations.
        </p>
      );
    }

    return (
      <ul className="space-y-1">
        {conversations.map((convo) => (
          <ConversationItem key={convo.participant._id} conversation={convo} />
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Messages</h2>
      </div>
      <div className="max-h-96 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default MessagesPanel;
