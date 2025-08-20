
import { IProfileUser } from '../features/profile/types';
import { api } from './axiosConfig';

export const fetchUserProfile = async (userId: string): Promise<IProfileUser> => {
  const response = await api.get(`/users/${userId}/profile`);
  return response.data;
};

export const followUser = async (userId: string): Promise<void> => {
  await api.post(`/users/${userId}/follow`);
};

export const unfollowUser = async (userId: string): Promise<void> => {
  await api.post(`/users/${userId}/unfollow`);
};