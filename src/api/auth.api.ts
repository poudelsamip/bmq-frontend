import type { SafeUser } from "../types/auth";
import apiClient from "./client";

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
    requiresVerification?: boolean;
}

export const authApi = {
    signup: async (data: SignupRequest) => {
        const response = await apiClient.post<AuthResponse<{ user: SafeUser }>>("/auth/signup", data);
        return response.data;
    },

    login: async (data: LoginRequest) => {
        const response = await apiClient.post<AuthResponse<{ accessToken: string; user: SafeUser }>>("/auth/login", data);
        return response.data;
    },

    verifyEmail: async (data: VerifyEmailRequest) => {
        const response = await apiClient.post<AuthResponse<{ accessToken: string; user: SafeUser }>>("/auth/verify-email", data);
        return response.data;
    },

    resendVerification: async (data: { email: string }) => {
        const response = await apiClient.post<AuthResponse<null>>("/auth/resend-verification", data);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post<AuthResponse<null>>("/auth/logout");
        return response.data;
    },

    refresh: async () => {
        const response = await apiClient.post<AuthResponse<{ accessToken: string }>>("/auth/refresh");
        return response.data;
    },

    getMe: async () => {
        const response = await apiClient.get<AuthResponse<{ user: SafeUser }>>("/auth/me");
        return response.data;
    },
};
