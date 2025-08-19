import { api } from './axiosConfig';

export const createPost = async (formData: FormData) => {
  try {
    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Optionally format error
    throw error;
  }
};

export const getFeedPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data.posts;
  } catch (error) {
    // Optionally format error
    throw error;
  }
};
