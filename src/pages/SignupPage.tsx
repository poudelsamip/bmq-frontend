import { useState, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Boxes, User, Mail, Lock } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "../components/SocialIcons";
import Button from "../components/ui/Button";
import EmailVerification from "../components/EmailVerification";
import { authApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export default function SignupPage() {
    const [fullName,         setFullName]         = useState("");
    const [email,            setEmail]            = useState("");
    const [password,         setPassword]         = useState("");
    const [confirmPassword,  setConfirmPassword]  = useState("");
    const [error,            setError]            = useState<string | null>(null);
    const [isLoading,        setIsLoading]        = useState(false);
    const [showVerification, setShowVerification] = useState(false);

    const { login } = useAuth();
    const navigate  = useNavigate();

    const handleSignup = async () => {
        if (!fullName.trim() || !email.trim() || !password) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            await authApi.signup({ name: fullName, email, password });
            setShowVerification(true);
        } catch (err: any) {
            const d = err.response?.data;
            if (d?.errors) {
                const first = Object.values(d.errors).flat()[0];
                setError((first as string) ?? d.message ?? "Signup failed.");
            } else {
                setError(d?.message ?? "Signup failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onEnter = (e: KeyboardEvent) => { if (e.key === "Enter") handleSignup(); };

    if (showVerification) {
        return (
            <EmailVerification
                email={email}
                onVerify={async (otp) => {
                    const res = await authApi.verifyEmail({ email, code: otp });
                    if (res.data?.accessToken && res.data?.user) {
                        login(res.data.accessToken, res.data.user);
                        navigate("/dashboard", { replace: true });
                    }
                }}
                onResend={() => authApi.resendVerification({ email })}
                onSuccess={() => {}}
                onBack={() => { setShowVerification(false); setError(null); }}
                showBackButton
                showAppHeader
            />
        );
    }

    return (
        <div className="bg-[#f7f9fb] min-h-screen flex items-start sm:items-center justify-center px-4 py-6 text-[#191c1e]">
            <main className="w-full max-w-md bg-white border border-[#e0e3e5] rounded p-5 sm:p-7 flex flex-col my-6">
                <header className="flex flex-col items-center mb-5 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center justify-center w-9 h-9 bg-[#4f46e5] rounded">
                            <Boxes size={20} className="text-[#dad7ff]" />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Bull Vortex</h1>
                    </div>
                    <p className="text-sm text-[#464555]">Create your account</p>
                </header>

                <div className="flex flex-col gap-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Full name</label>
                        <div className="relative flex items-center">
                            <User size={18} className="absolute left-2 text-[#464555]" />
                            <input type="text" value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="John Doe"
                                autoComplete="name"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Email address</label>
                        <div className="relative flex items-center">
                            <Mail size={18} className="absolute left-2 text-[#464555]" />
                            <input type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="name@company.com"
                                autoComplete="email"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative flex items-center">
                            <Lock size={18} className="absolute left-2 text-[#464555]" />
                            <input type="password" value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Confirm password</label>
                        <div className="relative flex items-center">
                            <Lock size={18} className="absolute left-2 text-[#464555]" />
                            <input type="password" value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    <Button fullWidth onClick={handleSignup} disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Sign up"}
                    </Button>

                    <div className="relative flex items-center py-1">
                        <div className="grow border-t border-[#e0e3e5]" />
                        <span className="mx-3 text-xs text-[#464555]">or</span>
                        <div className="grow border-t border-[#e0e3e5]" />
                    </div>

                    <Button variant="social" fullWidth
                        onClick={() => { window.location.href = `${API}/auth/google`; }}>
                        <GoogleIcon /> Continue with Google
                    </Button>
                    <Button variant="social" fullWidth
                        onClick={() => { window.location.href = `${API}/auth/github`; }}>
                        <GitHubIcon /> Continue with GitHub
                    </Button>

                    <p className="text-center text-xs text-[#464555]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#3525cd] font-medium hover:text-[#4f46e5]">Login</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}