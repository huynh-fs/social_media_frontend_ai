import React, { useEffect, useState } from 'react';

// Dummy API fetch function (replace with real API call)
const fetchNotifications = async () => {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 500));
  return [
    { id: '1', message: 'User X liked your post', createdAt: '2m ago' },
    { id: '2', message: 'User Y started following you', createdAt: '10m ago' },
    { id: '3', message: 'User Z commented: "Nice!"', createdAt: '1h ago' },
    { id: '4', message: 'User A shared your post', createdAt: '2h ago' },
  ];
};

const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow px-4 mt-6">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-gray-500">No notifications yet.</div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li key={notif.id} className="border-b pb-2 last:border-b-0">
              <div className="text-sm">{notif.message}</div>
              <div className="text-xs text-gray-400 mt-1">{notif.createdAt}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPanel;
