import React from "react";
import { useAuthStore } from "../../../stores/authStore";
import { Button } from "../../../components/common/Button";
import { IProfileUser } from "../types";
import { FollowButton } from "./FollowButton";
import { useChatStore } from "@/features/chat/stores/chatStore";

type ProfileHeaderProps = {
  user: IProfileUser;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwnProfile = currentUser?._id === user._id;

  const { openChat } = useChatStore((state) => state.actions); // ✨ 2. Lấy action openChat

  const handleMessageClick = () => {
    // ✨ 3. Hàm xử lý khi nhấn nút Message
    // Cần đảm bảo `user` object có đủ thông tin cho `IChatUser`
    const participant = {
      _id: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl,
    };
    openChat(participant);
  };

  const defaultBannerUrl = "/banners/default-banner.jpg"; // Từ thư mục public
  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"; // Từ thư mục public

  return (
    <div>
      {/* Banner */}
      <div className="h-48 bg-gray-300">
        {user.bannerUrl && (
          <img
            src={user.bannerUrl}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="px-4">
        {/* Avatar and Action Button */}
        <div className="flex justify-between items-end -mt-16">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            <img
              src={user.avatarUrl || defaultAvatarUrl}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {isOwnProfile ? (
              <Button variant="secondary">Edit Profile</Button>
            ) : (
              <>
                {/* ✨ 4. Thêm nút "Message" ở đây */}
                <Button variant="secondary" onClick={handleMessageClick}>
                  Message
                </Button>
                <FollowButton targetUserId={user._id} isInitiallyFollowing={user.isFollowing} />
              </>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold">
            {user.displayName || user.username}
          </h1>
          <p className="text-sm text-gray-500">@{user.username}</p>
          <p className="mt-2 text-base">{user.bio}</p>
        </div>

        {/* Follower Stats */}
        <div className="mt-4 flex space-x-4 text-sm text-gray-500">
          <p>
            <span className="font-bold text-black">{user.followingCount}</span>{" "}
            Following
          </p>
          <p>
            <span className="font-bold text-black">{user.followersCount}</span>{" "}
            Followers
          </p>
        </div>
      </div>
    </div>
  );
};
