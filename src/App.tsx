
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

export default function App() {
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


