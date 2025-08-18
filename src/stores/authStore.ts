import { create } from 'zustand';
import { api } from '../api/axiosConfig';

export interface AuthUser {
	_id: string;
	username: string;
	email: string;
}

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	loginWithCredentials: (credentials: { email: string; password: string }) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	loginWithCredentials: async (credentials) => {
		try {
			const response = await api.post('/auth/login', credentials);
			const { token, _id, email, username } = response.data as { token: string; _id: string; email: string; username: string };
			set({
				user: { _id, email, username },
				token,
			});
			localStorage.setItem('auth_token', token);
		} catch (error: unknown) {
			let message = 'Login failed';
			if (error && typeof error === 'object' && 'response' in error) {
				const err = error as any;
				message = err.response?.data?.message ?? message;
			}
			throw new Error(message);
		}
	},
	logout: () => {
		localStorage.removeItem('auth_token');
		set({ user: null, token: null });
	},
}));


