import { useState } from 'react';
import { api } from '../../../api/axiosConfig';

export function useLikePost() {
	const [isLoading, setIsLoading] = useState(false);

	const toggleLike = async (postId: string) => {
		setIsLoading(true);
		try {
			await api.post(`/posts/${postId}/like`);
		} catch (err) {
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { toggleLike, isLoading };
}
