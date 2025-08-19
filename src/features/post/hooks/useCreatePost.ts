import { useState } from 'react';
import { createPost as createPostService } from '../../../api/postService';

interface UseCreatePostResult {
  createPost: (content: string, image?: File) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useCreatePost(): UseCreatePostResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (content: string, image?: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      await createPostService(formData);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading, error };
}
