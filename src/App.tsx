import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import MainLayout from "./components/layout/MainLayout"; // Cập nhật đường dẫn nếu cần
import { useAuthStore } from "./stores/authStore";
import { useCallback, useEffect } from "react";

// ✨ --- Bắt đầu cập nhật Chat --- ✨
import { useChatStore } from "./features/chat/stores/chatStore"; // Cập nhật đường dẫn nếu cần
// ✨ --- Kết thúc cập nhật Chat --- ✨

import { socketService } from "./sockets/socketService";
import { useNotificationStore } from "./stores/notificationStore";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import { IMessage } from "./features/chat/types";

const ProtectedRoute = () => {
  // 1. Lấy token trực tiếp từ authStore.
  //    Store này đã được tự động nạp (rehydrated) từ localStorage bởi middleware `persist`.
  const token = useAuthStore((state) => state.token);

  // 2. Component này không cần thực hiện side effect (như gọi getProfile).
  //    Nó chỉ có một nhiệm vụ: kiểm tra token và điều hướng.
  //    Logic fetch profile sẽ được quản lý ở cấp cao hơn (App.tsx).
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default function App() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const getProfile = useAuthStore((state) => state.getProfile);

  const { initializeChatListener } = useChatStore((state) => state.actions);
  const { initNotificationSocket, setNotifications } = useNotificationStore(
    (state) => state.actions,
  );
  const { openChatWithNewMessage } = useChatStore((state) => state.actions);

  // Dùng useCallback để hàm getProfile không bị tạo lại mỗi lần render,
  // giúp useEffect hoạt động ổn định.
  const memoizedGetProfile = useCallback(() => {
    getProfile();
  }, [getProfile]);

  // useEffect này chỉ có một nhiệm vụ: đảm bảo thông tin user luôn được cập nhật
  // khi có token nhưng chưa có user (trường hợp F5 lại trang).
  useEffect(() => {
    if (token && !user) {
      memoizedGetProfile();
    }
  }, [token, user, memoizedGetProfile]);

  // useEffect này chỉ có một nhiệm vụ: quản lý vòng đời của kết nối socket.
  useEffect(() => {
    let chatCleanup: (() => void) | undefined;
    let notificationCleanup: (() => void) | undefined;

    // ✨ --- BẮT ĐẦU LOGIC LISTENER MỚI --- ✨
    // Định nghĩa hàm xử lý tin nhắn mới
    const handleNewMessage = (message: IMessage) => {
      console.log("Global listener received a new message:", message);
      const currentUser = useAuthStore.getState().user;

      // Chỉ xử lý nếu tin nhắn này là dành cho user hiện tại
      if (currentUser && message.receiver._id === currentUser._id) {
        // Gọi action mới từ store
        openChatWithNewMessage(message);
      }
    };
    // ✨ --- KẾT THÚC LOGIC LISTENER MỚI --- ✨

    // Chỉ thiết lập kết nối khi có đầy đủ token và user
    if (token && user) {
      console.log("Setting up socket connection and listeners...");
      socketService.connect(token, user._id);

      // Khởi tạo các listener và lưu lại hàm dọn dẹp của chúng
      chatCleanup = initializeChatListener();
      notificationCleanup = initNotificationSocket();

      // Khởi tạo listener cho tin nhắn mới
      const messageSocket = socketService.getSocket();
      if (messageSocket) {
        messageSocket.on("receive_message", handleNewMessage);
      }

      // Fetch dữ liệu ban đầu cho notifications
      const fetchInitialNotifications = async () => {
        try {
          // Logic này đã ổn
          const res = await fetch(`/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setNotifications(data.notifications || []);
          }
        } catch (error) {
          console.error("Failed to fetch initial notifications:", error);
        }
      };
      fetchInitialNotifications();
    }

    // HÀM DỌN DẸP
    // Sẽ chạy khi component unmount hoặc khi dependencies [token, user] thay đổi.
    return () => {
      // Dọn dẹp listener trước khi ngắt kết nối
      if (chatCleanup) chatCleanup();
      if (notificationCleanup) notificationCleanup();
      const messageSocket = socketService.getSocket();
      if (messageSocket) {
        messageSocket.off("receive_message", handleNewMessage);
      }

      // Ngắt kết nối socket khi người dùng logout (token không còn)
      if (!token) {
        console.log("Token is null, disconnecting socket.");
        socketService.disconnect();
      }
    };
    // Các hàm action từ store (initialize...) được đảm bảo là ổn định,
    // chỉ cần phụ thuộc vào `token` và `user`.
  }, [
    token,
    user,
    initializeChatListener,
    initNotificationSocket,
    setNotifications,
  ]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          {/* <Route path="post/:id" element={<PostDetailPage />} />  */}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
