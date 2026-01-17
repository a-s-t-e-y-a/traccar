import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth.api';
import { useAuthStore } from '@/store/useAuthStore';
import { SignupFormData } from '@/schemas/auth.schema';
import { LoginRequest, LoginResponse, User } from '@/api/types/auth.types';

export const useAuth = () => {
    const { login: setLoginState, logout: setLogoutState, setUser } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
        onSuccess: async (data: LoginResponse) => {
            if (data.token) {
                await setLoginState(data, data.token);
            } else {
                setUser(data);
            }
        },
    });

    const signupMutation = useMutation({
        mutationFn: (userData: SignupFormData) => authApi.signup(userData),
        onSuccess: (data: User) => {
            setUser(data);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: async () => {
            await setLogoutState();
        },
    });

    const { data: session, isLoading: isSessionLoading } = useQuery({
        queryKey: ['session'],
        queryFn: () => authApi.getSession(),
        enabled: !!useAuthStore.getState().token,
    });

    return {
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        signup: signupMutation.mutateAsync,
        isSigningUp: signupMutation.isPending,
        signupError: signupMutation.error,
        logout: logoutMutation.mutateAsync,
        session,
        isSessionLoading,
    };
};
