
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import { useAuthStore } from './stores/authStore';
import RegisterPage from './features/auth/RegisterPage';
import MainLayout from './components/layout/MainLayout';
import DefaultWidgetsPanel from './components/layout/DefaultWidgetsPanel';
import ExplorePanel from './features/explore/components/ExplorePanel';
import NotificationsPanel from './features/notifications/components/NotificationsPanel';
import MessagesPanel from './features/messages/components/MessagesPanel';
import ProfilePanel from './features/profile/components/ProfilePanel';
import { useEffect } from 'react';

const ProtectedRoute = () => {
	const token = localStorage.getItem('auth_token');
	const getProfile = useAuthStore((state) => state.getProfile);
	useEffect(() => {
		if (token) {
			getProfile();
		}
	}, [token, getProfile]);
	return token ? <Outlet /> : <Navigate to="/login" replace />;
};

import socketService from './sockets/socketService';
import { useNotificationStore, initNotificationSocket } from './stores/notificationStore';

export default function App() {

	const token = localStorage.getItem('auth_token');
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
					<Route index element={<DefaultWidgetsPanel />} />
					<Route path="explore" element={<ExplorePanel />} />
					<Route path="notifications" element={<NotificationsPanel />} />
					<Route path="messages" element={<MessagesPanel />} />
					<Route path="profile" element={<ProfilePanel />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}


