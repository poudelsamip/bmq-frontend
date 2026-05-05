import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import { authApi } from "../api/auth.api";
import { setApiToken } from "../api/client";
import { useNavigate } from "react-router-dom";
import type { SafeUser } from "../types/auth";

interface AuthContextType {
    user: SafeUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, userData: SafeUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            try {
                // Try to refresh token on load
                const res = await authApi.refresh();
                if (res.success && res.data?.accessToken) {
                    setApiToken(res.data.accessToken);
                    setAccessToken(res.data.accessToken);
                    
                    // Fetch user info
                    const userRes = await authApi.getMe();
                    if (userRes.success && userRes.data?.user) {
                        setUser(userRes.data.user);
                    }
                }
            } catch (err) {
                // Token refresh failed or user is not logged in.
                console.log("No active session.");
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        // Listen for token refresh events from interceptor
        const handleTokenRefreshed = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            setAccessToken(customEvent.detail);
        };

        // Listen for global logout events from interceptor (e.g. refresh failed)
        const handleLogoutEvent = () => {
            setUser(null);
            setAccessToken(null);
            navigate("/login");
        };

        window.addEventListener('auth:token_refreshed', handleTokenRefreshed);
        window.addEventListener('auth:logout', handleLogoutEvent);

        return () => {
            window.removeEventListener('auth:token_refreshed', handleTokenRefreshed);
            window.removeEventListener('auth:logout', handleLogoutEvent);
        };
    }, [navigate]);

    const login = (token: string, userData: SafeUser) => {
        setApiToken(token);
        setAccessToken(token);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (e) {
            console.error("Logout error", e);
        } finally {
            setApiToken(null);
            setAccessToken(null);
            setUser(null);
            navigate("/login");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
