import React, { useState } from 'react';
import { Input } from '@/components/common/Input';
import { useAuthStore } from '../../../stores/authStore';
import { useSubmitComment } from '../hooks/useSubmitComment';

interface CommentFormProps {
	postId: string;
	onCommentPosted: (comment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentPosted }) => {
	const user = useAuthStore((s) => s.user);
	const [text, setText] = useState('');
	const { submitComment, isLoading, error } = useSubmitComment();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;
		try {
			const comment = await submitComment({ postId, text });
			setText('');
			if (onCommentPosted) onCommentPosted(comment);
		} catch {}
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-start space-x-3 mb-2" key={postId}>
			<img
				src={user?.avatarUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
				alt={user?.username}
				className="w-8 h-8 rounded-full object-cover mt-1"
			/>
			<div className="flex-1">
				<Input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Write a comment..."
					disabled={isLoading}
				/>
				{error && <div className="text-xs text-red-600 mt-1">{error}</div>}
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
				disabled={isLoading || !text.trim()}
			>
				Send
			</button>
		</form>
	);
};

export default CommentForm;
