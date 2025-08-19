import { create } from 'zustand';
import socketService from '../sockets/socketService';
import { useAuthStore } from './authStore';
import { api } from '@/api/axiosConfig';

export interface INotification {
  _id: string;
  sender: {
    _id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
  read: boolean;
  type: 'like' | 'follow' | 'comment' | 'share';
  post: {
    _id: string;
    content: string;
  };

}

interface INotificationState {
  notifications: INotification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  setNotifications: (notifications: INotification[]) => void;
  addNotification: (notification: INotification) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<INotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  fetchNotifications: async () => {
    try {
      const res = await api.get(`/notifications`)
      useNotificationStore.getState().setNotifications(res.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },

  setNotifications: (notifications) => {
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },
}));

// Listen for socket events
let socketListenerInitialized = false;
export function initNotificationSocket() {
  if (socketListenerInitialized) return;
  const socket = socketService.getSocket();
  if (!socket) return;
  socket.on('new_notification', (notification: INotification) => {
    useNotificationStore.getState().addNotification(notification);
    // Optionally play sound here
  });
  socketListenerInitialized = true;
}
