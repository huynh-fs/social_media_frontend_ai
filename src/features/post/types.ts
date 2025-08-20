export interface IPost {
  _id: string;
  user: { _id: string; username: string; avatarUrl: string };
  content: string;
  imageURL?: string;
  createdAt: string;
  likes: string[];
  comments: string[];
  shares: number;
  isLikedByCurrentUser?: boolean;
  likeCount?: number;
}