import useSWR from 'swr';
import { api } from '../../../api/axiosConfig';

export interface IComment {
	_id: string;
	user: {
		_id: string;
		username: string;
		avatar?: string;
	};
	text: string;
	createdAt: string;
}

interface PostResponse {
	comments: IComment[];
}

const fetcher = async (postId: string) => {
	const res = await api.get(`/posts/${postId}`);
	// API trả về object Post, lấy ra comments
	return { comments: res.data.comments || [] };
};

export function useFetchComments(postId: string) {
	const { data, error, isLoading, mutate } = useSWR<PostResponse>(
		postId ? `/posts/${postId}/comments` : null,
		() => fetcher(postId)
	);
	return {
		comments: data?.comments || [],
		isLoading,
		error,
		mutate,
	};
}
