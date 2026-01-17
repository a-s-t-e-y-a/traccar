import { apiCall } from '../client';
import { LoginRequest, LoginResponse, User } from '../types/auth.types';

export const authApi = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        return apiCall<LoginResponse>({
            method: 'POST',
            url: '/session',
            data: new URLSearchParams({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    },
    signup: async (userData: { name: string; email: string; password: string }): Promise<User> => {
        return apiCall<User>({
            method: 'POST',
            url: '/users',
            data: userData,
        });
    },
    getSession: async (): Promise<User> => {
        return apiCall<User>({
            method: 'GET',
            url: '/session',
        });
    },
    logout: async (): Promise<void> => {
        return apiCall<void>({
            method: 'DELETE',
            url: '/session',
        });
    },
};
