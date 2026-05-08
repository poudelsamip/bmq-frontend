import api from "./client";
import type { AuthUser } from "../types/auth";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface Session {
    accessToken: string;
    user: AuthUser;
}

export const authApi = {
    signup: async (body: { name: string; email: string; password: string }) => {
        const res = await api.post<ApiResponse<{ user: AuthUser }>>(
            "/auth/signup",
            body,
        );
        return res.data;
    },

    login: async (body: { email: string; password: string }) => {
        const res = await api.post<
            ApiResponse<Session> & { requiresVerification?: boolean }
        >("/auth/login", body);
        return res.data;
    },

    verifyEmail: async (body: { email: string; code: string }) => {
        const res = await api.post<ApiResponse<Session>>(
            "/auth/verify-email",
            body,
        );
        return res.data;
    },

    resendVerification: async (body: { email: string }) => {
        const res = await api.post("/auth/resend-verification", body);
        return res.data;
    },

    refresh: async () => {
        const res = await api.post<ApiResponse<Session>>("/auth/refresh");
        return res.data;
    },

    logout: async () => {
        const res = await api.post<ApiResponse<null>>("/auth/logout");
        return res.data;
    },
};
