import axios, { AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { config } from '@/config/env';

export const apiClient = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (requestConfig) => {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`🚀 Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`, requestConfig.data ? JSON.stringify(requestConfig.data, null, 2) : '');
        return requestConfig;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ Response: ${response.status} ${response.config.url}`, JSON.stringify(response.data, null, 2));
        return response;
    },
    async (error) => {
        console.error('❌ API Error:', error.response?.status, error.config?.url, error.response?.data || error.message);
        if (error.response?.status === 401) {
            await SecureStore.deleteItemAsync('authToken');
        }
        return Promise.reject(error);
    }
);

export async function apiCall<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response = await apiClient(config);
        return response.data;
    } catch (error: any) {
        throw {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
            data: error.response?.data,
        };
    }
}
