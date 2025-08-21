import { create } from "zustand";
import { api } from "../api/axiosConfig";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  avatarUrl?: string; // Optional avatar field
  bio?: string; // Optional bio field
  following?: string[]; // Optional following field
  followers?: string[]; // Optional followers field
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loginWithCredentials: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  getProfile: () => Promise<void>;
  logout: () => void;
  updateProfile: (formData: FormData) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loginWithCredentials: async (credentials) => {
        try {
          const response = await api.post("/auth/login", credentials);
          const {
            token,
            _id,
            email: responseEmail,
            username: responseUsername,
          } = response.data as {
            token: string;
            _id: string;
            email: string;
            username: string;
          };
          set({
            user: { _id, email: responseEmail, username: responseUsername },
            token,
          });
          localStorage.setItem("auth_token", token);
          // Fetch user profile after login
          // await getProfile();
        } catch (error: unknown) {
          let message = "Login failed";
          if (error && typeof error === "object" && "response" in error) {
            const err = error as any;
            message = err.response?.data?.message ?? message;
          }
          throw new Error(message);
        }
      },
      logout: () => {
        localStorage.removeItem("auth_token");
        set({ user: null, token: null });
      },
      register: async (username: string, email: string, password: string) => {
        try {
          const response = await api.post("/auth/register", {
            username,
            email,
            password,
          });
          const {
            token,
            _id,
            email: responseEmail,
            username: responseUsername,
          } = response.data as {
            token: string;
            _id: string;
            email: string;
            username: string;
          };
          set({
            user: { _id, email: responseEmail, username: responseUsername },
            token,
          });
          localStorage.setItem("auth_token", token);
          // Fetch user profile after registration
          // await getProfile();
        } catch (error: unknown) {
          let message = "Login failed";
          if (error && typeof error === "object" && "response" in error) {
            const err = error as any;
            message = err.response?.data?.message ?? message;
          }
          throw new Error(message);
        }
      },
      getProfile: async () => {
        try {
          const response = await api.get("/auth/profile");
          const userData = response.data as AuthUser;
          set({ user: userData });
        } catch (error: unknown) {
          let message = "Failed to fetch profile";
          if (error && typeof error === "object" && "response" in error) {
            const err = error as any;
            message = err.response?.data?.message ?? message;
          }
          throw new Error(message);
        }
      },
      updateProfile: async (formData: FormData) => {
        try {
          const response = await api.put("/auth/me", formData);
          const userData = response.data as AuthUser;
          set({ user: userData });
        } catch (error: unknown) {
          let message = "Failed to update profile";
          if (error && typeof error === "object" && "response" in error) {
            const err = error as any;
            message = err.response?.data?.message ?? message;
          }
          throw new Error(message);
        }
      },
    }),
    {
      name: "auth-storage", // Tên key trong storage
      storage: createJSONStorage(() => sessionStorage), // Dùng sessionStorage
      // Chỉ lưu `user` và `token`, không lưu các action
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
