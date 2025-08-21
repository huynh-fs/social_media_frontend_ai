import React from "react";
import { IChatUser } from "../types";

type ChatBoxHeaderProps = {
  participant: IChatUser;
  onClose: () => void;
};

const defaultAvatarUrl =
  "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

export const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
  participant,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 border-b cursor-pointer">
      <div className="flex items-center space-x-2">
        <img
          src={participant.avatarUrl || defaultAvatarUrl}
          alt={participant.username}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-bold">{participant.username}</span>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-300">
        &times; {/* Dấu X */}
      </button>
    </div>
  );
};
