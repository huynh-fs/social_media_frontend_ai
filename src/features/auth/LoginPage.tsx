import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

type LoginCredentials = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

	// We expect the auth store to expose an async login function that accepts credentials
	// and handles the underlying API request + state updates.
	const loginWithCredentials = useAuthStore((state) => state.loginWithCredentials);
	const getProfile = useAuthStore((state) => state.getProfile);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setIsLoading(true);
		try {
			await loginWithCredentials({ email, password });
			await getProfile();
			navigate('/');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Login failed. Please try again.';
			setErrorMessage(message);
		} finally {
			setIsLoading(false);
		}
	};

		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
				<div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
					<h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Login</h1>

					{errorMessage && (
						<div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
							{errorMessage}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
								className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								placeholder="your_email"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="current-password"
								required
								className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								placeholder="••••••••"
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="relative inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{isLoading && (
								<svg
									className="absolute left-3 h-4 w-4 animate-spin"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
									/>
								</svg>
							)}
							<span>{isLoading ? 'Logging in...' : 'Login'}</span>
						</button>
					</form>
					<div className="text-center text-sm mt-6">
						Don't have an account?{' '}
						<a href="/register" className="text-blue-600 hover:underline">Sign up</a>
					</div>
				</div>
			</div>
		);
}


