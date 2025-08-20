import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../../api/userService';
import { IProfileUser } from '../types';

export const useFetchUserProfile = (userId: string | undefined) => {
  const [user, setUser] = useState<IProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const getUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await fetchUserProfile(userId);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user profile.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [userId]);

  return { user, isLoading, error };
};