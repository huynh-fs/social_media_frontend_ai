import React from "react";
import { IChatUser } from "../types";
import clsx from "clsx";

type ChatBoxHeaderProps = {
  participant: IChatUser;
  hasUnseenMessages: boolean; // ✨ 1. Nhận prop mới
  onClick: () => void; // ✨ 2. Thêm prop onClick
  onClose: () => void;
};

const defaultAvatarUrl =
  "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

export const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
  participant,
  hasUnseenMessages,
  onClick,
  onClose,
}) => {
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài và kích hoạt onClick của header
    onClose();
  };
  return (
    <div
      onClick={onClick} // ✨ 3. Đánh dấu là đã xem khi click vào header
      className={clsx(
        "flex items-center justify-between p-2 border-b cursor-pointer transition-colors",
        // ✨ 4. Thay đổi style dựa trên trạng thái
        hasUnseenMessages ? "bg-blue-500 text-white" : "bg-gray-100 text-black",
      )}
    >
      <div className="flex items-center space-x-2">
        <img
          src={participant.avatarUrl || defaultAvatarUrl}
          alt={participant.username}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-bold">{participant.username}</span>
      </div>
      <button
        onClick={handleCloseClick}
        className={clsx(
          "p-1 rounded-full",
          hasUnseenMessages ? "hover:bg-blue-600" : "hover:bg-gray-300",
        )}
      >
        &times; {/* Dấu X */}
      </button>
    </div>
  );
};
