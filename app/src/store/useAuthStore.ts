import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/api/types/auth.types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setToken: (token) => set({ token }),
    login: async (user, token) => {
        await SecureStore.setItemAsync('authToken', token);
        set({ user, token, isAuthenticated: true });
    },
    logout: async () => {
        await SecureStore.deleteItemAsync('authToken');
        set({ user: null, token: null, isAuthenticated: false });
    },
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (token) {
                set({ token, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch {
            set({ isLoading: false });
        }
    },
}));
