import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import MainLayout from "./components/layout/MainLayout";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const token = localStorage.getItem("auth_token");
  const getProfile = useAuthStore((state) => state.getProfile);
  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token, getProfile]);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

import socketService from "./sockets/socketService";
import {
  useNotificationStore,
  initNotificationSocket,
} from "./stores/notificationStore";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const token = localStorage.getItem("auth_token");
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  const getProfile = useAuthStore((s) => s.getProfile);

  useEffect(() => {
    // Tự động connect lại socket khi reload nếu đã authenticate
    const fetchProfile = async () => {
      await getProfile();
      const user = useAuthStore.getState().user;
      socketService.connect(token!, user!._id);
      initNotificationSocket();
      // Fetch initial notifications from API
      (async () => {
        try {
          const res = await fetch(`/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setNotifications(data.notifications || []);
        } catch {}
      })();
    };
    if (token) {
      fetchProfile();
    } else {
      socketService.disconnect();
      setNotifications([]);
    }
  }, [token, setNotifications]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          {/* <Route path="post/:id" element={<PostDetailPage />} />  */}
          {/* Thêm các trang chính khác ở đây nếu cần */}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
