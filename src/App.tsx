import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProjectsPage from "./pages/ProjectsPage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import JobsPage from "./pages/JobsPage";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/auth/callback" element={<OAuthCallbackPage />} />

                {/* Protected — gated by ProtectedRoute */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<ProjectsPage />} />
                        <Route
                            path="projects/:id"
                            element={<ProjectDetailsPage />}
                        />
                        <Route
                            path="projects/:id/queues/:queueName/jobs"
                            element={<JobsPage />}
                        />
                        <Route path="billing" element={<BillingPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}
