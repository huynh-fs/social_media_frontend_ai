import React from 'react';
import { formatDate } from '../../../lib/formatDate';

export interface NotificationItemProps {
  notification: {
    _id: string;
    sender: {
      _id: string;
      username: string;
      avatarUrl?: string;   
    };
    type: string;
    createdAt: string;
    read: boolean;
  };
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
    const message = notification.type === 'like' ? 'liked your post' : notification.type === 'follow' ? 'started following you' : notification.type === 'comment' ? 'commented on your post' : 'shared your post';
  return (
    <div className="flex items-start space-x-3 py-3 border-b last:border-b-0">
      <img
        src={notification.sender.avatarUrl || 'https://static.vecteezy.com/system/resources/previews/036/280/651/large_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'}
        alt={notification.sender.username}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="font-semibold text-sm">{notification.sender.username}</div>
        <div className="text-gray-800 text-sm mb-1">{message}</div>
        <div className="text-xs text-gray-500">{formatDate(notification.createdAt)}</div>
      </div>
      {!notification.read && <span className="w-3 h-3 bg-blue-500 rounded-full mt-2" />}
    </div>
  );
};

export default NotificationItem;
