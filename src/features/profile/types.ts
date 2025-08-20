// Giả sử IPost đã được định nghĩa ở một nơi khác, ví dụ src/features/feed/types.ts


export interface IProfileUser {
  _id: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  followingCount: number;
  followersCount: number;
  isFollowing: boolean;
}

// Đây là một ví dụ cho IPost để code chạy được
export interface IUserSummary {
  _id: string;
  username: string;
  avatarUrl?: string;
}
