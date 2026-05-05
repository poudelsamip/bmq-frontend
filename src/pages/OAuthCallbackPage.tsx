import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { setApiToken } from "../api/client";

export default function OAuthCallbackPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const isProcessed = useRef(false);

    useEffect(() => {
        if (isProcessed.current) return;
        isProcessed.current = true;

        const processAuth = async () => {
            try {
                // The refresh token cookie should be automatically sent
                const refreshRes = await authApi.refresh();
                if (refreshRes.data?.accessToken) {
                    // Temporarily set the API token for the next request
                    setApiToken(refreshRes.data.accessToken);
                    
                    // Get the user data
                    const meRes = await authApi.getMe();
                    if (meRes.data?.user) {
                        // Use the auth context login which also sets the api token
                        login(refreshRes.data.accessToken, meRes.data.user);
                        navigate("/dashboard");
                        return;
                    }
                }
                throw new Error("Failed to authenticate");
            } catch (err) {
                console.error("OAuth callback error:", err);
                navigate("/login");
            }
        };

        processAuth();
    }, [login, navigate]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#f7f9fb]">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3525cd] border-t-transparent"></div>
                <p className="text-sm font-medium text-[#464555]">Authenticating...</p>
            </div>
        </div>
    );
}
