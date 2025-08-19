import React, { useCallback, useEffect, useState } from 'react';
import CreatePostForm from './CreatePostForm';
import PostCard from './PostCard/PostCard';
import { getFeedPosts } from '../../../api/postService';

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

const FeedTimeline: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFeedPosts();
      setPosts(data);
    } catch (err) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex flex-col h-full py-6">
      {/* <h1 className="text-2xl font-bold mb-4 py-6"></h1> */}
      <CreatePostForm onPostCreated={handlePostCreated} />
    <div className="space-y-4 mt-4 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {loading ? (
          <div className="text-gray-500">Loading feed...</div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500">No posts yet.</div>
        ) : (
          posts.length > 0 && posts.map((post) => (
            <PostCard key={post._id} post={post} onLike={() => {}} onComment={() => {}} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedTimeline;
