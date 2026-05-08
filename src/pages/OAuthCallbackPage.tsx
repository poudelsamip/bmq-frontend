import { useEffect, useRef } from "react";
import { useNavigate }       from "react-router-dom";
import { authApi }           from "../api/auth.api";
import { useAuth }           from "../context/AuthContext";

export default function OAuthCallbackPage() {
    const { login }   = useAuth();
    const navigate    = useNavigate();
    const processed   = useRef(false);

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        const refreshToken = async () => {
            try {
                const res = await authApi.refresh();
                if (res.data?.accessToken && res.data?.user) {
                    login(res.data.accessToken, res.data.user);
                    navigate("/dashboard", { replace: true });
                } else {
                    navigate("/login", { replace: true });
                }
            } catch {
                navigate("/login", { replace: true });
            }
        };

        refreshToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#f7f9fb]">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4f46e5] border-t-transparent" />
                <p className="text-sm font-medium text-[#464555]">Authenticating...</p>
            </div>
        </div>
    );
}