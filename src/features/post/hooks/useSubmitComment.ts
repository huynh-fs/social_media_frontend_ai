import { useState } from 'react';
import { api } from '../../../api/axiosConfig';

interface SubmitCommentArgs {
	postId: string;
	text: string;
}

export function useSubmitComment() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submitComment = async ({ postId, text }: SubmitCommentArgs) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await api.post(`/posts/${postId}/comments`, { text });
			return res.data; // Trả về comment mới
		} catch (err: any) {
			setError(err?.response?.data?.message || 'Failed to submit comment');
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { submitComment, isLoading, error };
}
