import React, { useEffect } from "react";
import { useNotificationStore } from "../../../stores/notificationStore";
import NotificationItem from "./NotificationItem";

const NotificationsPanel: React.FC = () => {
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  // const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  // const fetchNotifications = useNotificationStore((s) => s.fetchNotifications);

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  // useEffect(() => {
  //   if (unreadCount > 0) {
  //     // Optionally call API to mark all as read
  //     markAllAsRead();
  //   }
  // }, [unreadCount, markAllAsRead]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <div className="text-gray-400 text-sm">No notifications yet.</div>
      ) : (
        <div className="divide-y">
          {notifications.map((n) => (
            <NotificationItem key={n._id} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
