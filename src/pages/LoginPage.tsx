// src/pages/LoginPage.tsx
import { useState } from "react";
import { GoogleIcon, GitHubIcon } from "../components/SocialIcons";
import { Boxes, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log({ email, password });
    };

    return (
        <div className="bg-[#f7f9fb] min-h-screen flex items-start sm:items-center justify-center px-4 py-6 text-[#191c1e]">
            <main className="w-full max-w-md bg-white border border-[#e0e3e5] rounded p-5 sm:p-7 flex flex-col my-6">
                {/* Header */}
                <header className="flex flex-col items-center mb-5 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center justify-center w-9 h-9 bg-[#4f46e5] rounded">
                            <Boxes size={20} className="text-[#dad7ff]" />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                            Bull Vortex
                        </h1>
                    </div>
                    <p className="text-sm text-[#464555]">Welcome back</p>
                </header>

                {/* Form */}
                <div className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email address
                        </label>
                        <div className="relative flex items-center">
                            <Mail size={18} className="absolute left-2 text-[#464555]" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-xs text-[#3525cd] hover:text-[#4f46e5]"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative flex items-center">
                            <Lock size={18} className="absolute left-2 text-[#464555]" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <Button fullWidth onClick={handleLogin} className="mt-1">
                        Login
                    </Button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center py-3">
                    <div className="grow border-t border-[#e0e3e5]" />
                    <span className="mx-3 text-xs text-[#464555]">or</span>
                    <div className="grow border-t border-[#e0e3e5]" />
                </div>

                {/* Social */}
                <div className="flex flex-col gap-2.5 mb-3">
                    <Button variant="social" fullWidth>
                        <GoogleIcon />
                        Continue with Google
                    </Button>
                    <Button variant="social" fullWidth>
                        <GitHubIcon />
                        Continue with GitHub
                    </Button>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#464555]">
                    Don't have an account?{" "}
                    <Link to={'/signup'}
                        className="text-[#3525cd] font-medium hover:text-[#4f46e5]"
                    >
                        Sign Up
                    </Link>
                </p>
            </main>
        </div>
    );
}
