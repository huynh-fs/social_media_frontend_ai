import React, { useEffect } from 'react';
import { formatDate } from '../../../../lib/formatDate';

interface IPost {
  _id: string;
  user: { _id: string; username: string; avatarUrl: string };
  content: string;
  imageURL?: string;
  createdAt: string;
  likes: string[];
  comments: string[];
  shares: number;
}

export interface PostCardProps {
  post: IPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  useEffect(() => {
    // This effect runs when the component mounts
    console.log(`PostCard mounted for post: ${post.user.avatarUrl}`);
  }, []);

  return (
    <div className="bg-white border rounded-md p-4 mb-4">
      {/* Header */}
      <div className="flex items-center mb-2">
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
      <div className="mb-2">{post.content}</div>
      {post.imageURL && (
        <img src={post.imageURL} alt="post" className="rounded-md mb-2 w-full object-cover" />
      )}
      {/* Footer (Action Bar) */}
      <div className="flex justify-between text-gray-500 text-sm mt-2">
        <button className="flex items-center space-x-1 hover:text-blue-600" onClick={() => onLike(post._id)}>
          <span>👍</span>
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600" onClick={() => onComment(post._id)}>
          <span>💬</span>
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <span>🔄</span>
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
