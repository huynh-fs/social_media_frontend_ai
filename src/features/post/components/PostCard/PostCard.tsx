import React, { useEffect, useState } from 'react';
import CommentSection from '../CommentSection';
import { formatDate } from '../../../../lib/formatDate';
import { useLikePost } from '../../hooks/useLikePost';
import { useNavigate } from 'react-router-dom';

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

export interface PostCardProps {
  post: IPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const navigate = useNavigate();
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser ?? false);
  const [likeCount, setLikeCount] = useState(
    typeof post.likeCount === 'number' ? post.likeCount : post.likes.length
  );
  const { toggleLike, isLoading: likeLoading } = useLikePost();

  useEffect(() => {
    setIsLiked(post.isLikedByCurrentUser ?? false);
    setLikeCount(typeof post.likeCount === 'number' ? post.likeCount : post.likes.length);
  }, [post.isLikedByCurrentUser, post.likeCount, post.likes.length]);

  const handleLikeClick = async () => {
    const prevLiked = isLiked;
    const prevCount = likeCount;
    // Optimistic update
    setIsLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      await toggleLike(post._id);
    } catch (err) {
      // Rollback UI
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  // Hàm highlight hashtag
  const renderContentWithHashtags = (content: string) => {
    const parts = content.split(/(#[\w]+)/g);
    return parts.map((part, idx) => {
      if (/^#[\w]+$/.test(part)) {
        return (
          <span key={idx} className="text-blue-600 font-semibold cursor-pointer hover:underline">{part}</span>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-white border rounded-md p-4 mb-4" key={post._id}>
      {/* Header */}
      <div className="flex items-center mb-2 cursor-pointer"
        onClick={() => navigate(`/profile/${post.user._id}`)}
      >
        <img
          src={post.user.avatarUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <span className="font-bold">{post.user.username}</span>
          <span className="ml-2 text-sm text-gray-500">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      {/* Body */}
      <div className="mb-2">{renderContentWithHashtags(post.content)}</div>
      {post.imageURL && (
        <img src={post.imageURL} alt="post" className="rounded-md mb-2 w-full object-cover" />
      )}
      {/* Footer (Action Bar) */}
      <div className="flex justify-between text-gray-500 text-sm mt-2">
        <button
          className={`flex items-center space-x-1 hover:text-blue-600 ${isLiked ? 'text-red-500 font-bold' : ''}`}
          onClick={handleLikeClick}
          disabled={likeLoading}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likeCount}</span>
        </button>
        <button
          className={`flex items-center space-x-1 hover:text-blue-600 ${isCommentSectionOpen ? 'font-bold text-blue-600' : ''}`}
          onClick={() => setIsCommentSectionOpen((prev) => !prev)}
        >
          <span>💬</span>
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <span>🔄</span>
          <span>{post.shares}</span>
        </button>
      </div>
      {/* Comment Section */}
      {isCommentSectionOpen && (
        <CommentSection postId={post._id} />
      )}
    </div>
  );
};

export default PostCard;
