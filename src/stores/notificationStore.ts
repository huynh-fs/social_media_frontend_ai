import { create } from "zustand";
import { socketService } from "../sockets/socketService";
import { api } from "@/api/axiosConfig";

// Interface INotification của bạn đã rất tốt, giữ nguyên
export interface INotification {
  _id: string;
  sender: {
    _id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
  read: boolean;
  type: "like" | "follow" | "comment";
  post?: {
    // Post có thể không có (ví dụ: thông báo follow)
    _id: string;
    content: string;
  };
}

// Interface cho state của store
interface INotificationState {
  notifications: INotification[];
  unreadCount: number;
  actions: {
    // ✨ Đóng gói các action vào một object để gọi nhất quán
    fetchNotifications: () => Promise<void>;
    setNotifications: (notifications: INotification[]) => void;
    addNotification: (notification: INotification) => void;
    markAllAsRead: () => Promise<void>; // ✨ Chuyển thành async để gọi API
    initNotificationSocket: () => () => void; // ✨ Hàm này sẽ trả về một hàm dọn dẹp
  };
}

export const useNotificationStore = create<INotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  actions: {
    fetchNotifications: async () => {
      try {
        const res = await api.get("/notifications");
        get().actions.setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    },

    setNotifications: (notifications) => {
      set({
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      });
    },

    addNotification: (notification) => {
      // Tránh thêm thông báo trùng lặp từ socket
      if (get().notifications.some((n) => n._id === notification._id)) {
        return;
      }
      set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));
      // Có thể thêm logic phát âm thanh ở đây
    },

    markAllAsRead: async () => {
      // Cập nhật giao diện ngay lập tức (Optimistic Update)
      const originalNotifications = get().notifications;
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));

      // Gọi API để cập nhật backend
      try {
        await api.post("/notifications/read");
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
        // Rollback nếu có lỗi
        get().actions.setNotifications(originalNotifications);
      }
    },

    // ✨ --- PHẦN QUAN TRỌNG NHẤT --- ✨
    initNotificationSocket: () => {
      console.log("Initializing notification socket listener...");

      const handleNewNotification = (notification: INotification) => {
        console.log("Received new notification via socket:", notification);
        get().actions.addNotification(notification);
      };

      // Đăng ký listener với socketService
      socketService.on("new_notification", handleNewNotification);

      // Trả về một hàm dọn dẹp
      // Hàm này sẽ được gọi bởi `useEffect` trong `App.tsx` khi cần.
      return () => {
        console.log("Cleaning up notification socket listener...");
        // Hủy đăng ký listener với socketService
        socketService.off("new_notification", handleNewNotification);
      };
    },
  },
}));

// ✨ Xóa hoàn toàn hàm `initNotificationSocket` và biến `socketListenerInitialized` ở ngoài.
// Logic này giờ đã là một phần của store, an toàn và có thể quản lý được.
