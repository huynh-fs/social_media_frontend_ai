import React from 'react';

export interface CommentItemProps {
	comment: {
		_id: string;
		user: {
			_id: string;
			username: string;
			avatarUrl?: string;
		};
		text: string;
		createdAt: string;
	};
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	return (
		<div className="flex items-start space-x-3 py-2" key={comment._id}>
			<img
				src={comment.user.avatarUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
				alt={comment.user.username}
				className="w-8 h-8 rounded-full object-cover"
			/>
			<div>
				<div className="font-bold text-sm">{comment.user.username}</div>
				<div className="text-gray-800 text-sm mb-1">{comment.text}</div>
				<div className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
			</div>
		</div>
	);
};

export default CommentItem;
