import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    useCallback,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { tokenStore } from "../api/client";
import type { AuthUser } from "../types/auth";

interface AuthCtx {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: AuthUser) => void;
    logout: () => Promise<void>;
    updateUser: (partial: Partial<AuthUser>) => void;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

// auth provider
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const navigateRef = useRef(navigate);
    useEffect(() => {
        navigateRef.current = navigate;
    });

    // stable login / logout
    const login = useCallback((token: string, userData: AuthUser) => {
        tokenStore.set(token);
        setUser(userData);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch {
            // ignore - clear state regardless
        } finally {
            tokenStore.set(null);
            setUser(null);
            navigateRef.current("/auth", { replace: true });
        }
    }, []);

    const updateUser = useCallback((partial: Partial<AuthUser>) => {
        setUser((prev) => (prev ? { ...prev, ...partial } : prev));
    }, []);

    // Boot: rehydrate from HttpOnly refresh cookie
    // Keeps the user logged in across hard reloads.
    // The access token lives only in memory — a reload clears it.
    // The refresh cookie (HttpOnly, Secure) survives the reload and lets
    // us mint a new access token silently here before rendering anything.
    useEffect(() => {
        const rehydrate = async () => {
            try {
                const res = await authApi.refresh();
                if (res.data?.accessToken && res.data?.user) {
                    login(res.data.accessToken, res.data.user);
                }
            } catch {
                // no session - show login
            } finally {
                setIsLoading(false);
            }
        };

        rehydrate();
    }, [login]);

    // Interceptor -> session expired
    useEffect(() => {
        const handler = () => {
            setUser(null);
            tokenStore.set(null);
            navigateRef.current("/auth", { replace: true });
        };
        window.addEventListener("auth:expired", handler);
        return () => window.removeEventListener("auth:expired", handler);
    }, []);

    return (
        <Ctx.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </Ctx.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}
