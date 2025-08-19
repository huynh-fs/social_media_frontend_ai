import React from 'react';
import { useFetchComments } from '../hooks/useFetchComments';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface CommentSectionProps {
	postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
	const { comments, isLoading, error, mutate } = useFetchComments(postId);

	// Khi gửi bình luận mới, thêm vào đầu danh sách hoặc re-fetch
	const handleCommentPosted = async (newComment: any) => {
		// Optimistically update UI
		mutate({ comments: [...comments, newComment] }, false);
		// Hoặc: await mutate(); // Nếu muốn re-fetch từ server
	};

	return (
		<div className="mt-4">
			<CommentForm postId={postId} onCommentPosted={handleCommentPosted} />
			{isLoading ? (
				<div className="text-gray-500 text-sm py-2">Loading comments...</div>
			) : error ? (
				<div className="text-red-500 text-sm py-2">Failed to load comments.</div>
			) : comments.length === 0 ? (
				<div className="text-gray-400 text-sm py-2">No comments yet.</div>
			) : (
				<div className="space-y-2">
					{comments && comments.length>0 && comments.map((comment) => (
						<CommentItem key={comment._id} comment={comment} />
					))}
				</div>
			)}
		</div>
	);
};

export default CommentSection;
