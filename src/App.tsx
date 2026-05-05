import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import Dasboard from "./pages/Dasboard";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/auth/callback" element={<OAuthCallbackPage />} />
                <Route path="/dashboard" element={<Dasboard />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
