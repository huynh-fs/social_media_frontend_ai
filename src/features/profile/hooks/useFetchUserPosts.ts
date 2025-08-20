import { useState, useEffect } from 'react';
import { fetchPostsByUserId } from '../../../api/postService';
import { IPost } from '../../post/types';

export const useFetchUserPosts = (userId: string | undefined) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const getPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userPosts = await fetchPostsByUserId(userId);
        setPosts(userPosts);
      } catch (err) {
        setError('Failed to fetch user posts.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [userId]);

  return { posts, isLoading, error };
};