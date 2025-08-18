import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import { useAuthStore } from './stores/authStore';

const ProtectedRoute = () => {
	const token = useAuthStore((s) => s.token);
	return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const PlaceholderFeed = () => (
	<div className="min-h-screen flex items-center justify-center">
		<div className="text-xl font-semibold">Home Feed (Protected)</div>
	</div>
);

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<PlaceholderFeed />} />
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}


