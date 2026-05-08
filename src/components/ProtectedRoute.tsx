import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    // waiting for the refresh cookie check show nothing yet.
    // Without this guard, isAuthenticated is false for ~200ms on every
    // reload and the user gets flashed to /login before being redirected back.
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#f7f9fb]">
                <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#4f46e5] border-t-transparent" />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
