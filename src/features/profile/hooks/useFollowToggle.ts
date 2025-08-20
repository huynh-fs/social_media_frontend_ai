import { useState } from 'react';
import { followUser, unfollowUser } from '../../../api/userService';

export const useFollowToggle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const performFollow = async (userId: string) => {
    setIsLoading(true);
    try {
      await followUser(userId);
    } catch (error) {
      console.error("Failed to follow user", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const performUnfollow = async (userId: string) => {
    setIsLoading(true);
    try {
      await unfollowUser(userId);
    } catch (error) {
      console.error("Failed to unfollow user", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { performFollow, performUnfollow, isLoading };
};