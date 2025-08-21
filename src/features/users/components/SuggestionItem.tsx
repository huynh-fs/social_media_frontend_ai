import React, { useState } from "react";
import { Button } from "../../../components/common/Button";

export interface SuggestionUser {
  _id: string;
  username: string;
  avatarUrl?: string;
}

interface SuggestionItemProps {
  user: SuggestionUser;
  onFollow: (userId: string) => Promise<void>;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ user, onFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    await onFollow(user._id);
    setIsFollowing(true);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <img
          src={
            user.avatarUrl ||
            "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
          }
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium">{user.username}</span>
      </div>
      <Button
        variant={isFollowing ? "primary" : "secondary"}
        size="sm"
        disabled={isFollowing || loading}
        onClick={handleFollow}
        isLoading={loading}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default SuggestionItem;
