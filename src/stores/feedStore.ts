import { getPostById } from "@/api/postService";
import { create } from "zustand";

// Định nghĩa type cho bài viết
interface IPost {
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

interface IFeedState {
  prependedPosts: IPost[];
  prependPost: (post: IPost) => void;
  clearPrependedPosts: () => void;
}

export const useFeedStore = create<IFeedState>((set, get) => ({
  prependedPosts: [],
  prependPost: async (post) => {
    const current = get().prependedPosts;
    const fetchedPost = await getPostById(post._id);
    // Đảm bảo không thêm trùng lặp theo _id
    if (!current.some((p) => p._id === post._id)) {
      set({ prependedPosts: [fetchedPost, ...current] });
    }
  },
  clearPrependedPosts: () => set({ prependedPosts: [] }),
}));
