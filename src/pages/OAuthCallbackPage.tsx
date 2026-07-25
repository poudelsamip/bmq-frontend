import { useEffect, useRef } from "react";
import { useNavigate }       from "react-router-dom";
import { authApi }           from "../api/auth.api";
import { useAuth }           from "../context/AuthContext";
import { tokenStore }        from "../api/client";

export default function OAuthCallbackPage() {
    const { login }   = useAuth();
    const navigate    = useNavigate();
    const processed   = useRef(false);

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        const handleCallback = async () => {
            // Primary path: access token is in the URL query param
            const params = new URLSearchParams(window.location.search);
            const token  = params.get("token");

            if (token) {
                try {
                    // Store the token so the /me request is authenticated
                    tokenStore.set(token);
                    const res = await authApi.getMe();
                    if (res.data?.user) {
                        login(token, res.data.user);
                        navigate("/dashboard", { replace: true });
                        return;
                    }
                } catch {
                    tokenStore.set(null);
                }
            }

            // Fallback: try the refresh cookie (works when same-origin or cookie was accepted)
            try {
                const res = await authApi.refresh();
                if (res.data?.accessToken && res.data?.user) {
                    login(res.data.accessToken, res.data.user);
                    navigate("/dashboard", { replace: true });
                    return;
                }
            } catch {
                // refresh also failed
            }

            navigate("/auth", { replace: true });
        };

        handleCallback();
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