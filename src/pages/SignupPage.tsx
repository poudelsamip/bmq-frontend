// src/pages/SignupPage.tsx
import { useState } from "react";
import { GoogleIcon, GitHubIcon } from "../components/SocialIcons";
import { Boxes, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        console.log({ fullName, email, password, confirmPassword });
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
                    <p className="text-sm text-[#464555]">
                        Create your account
                    </p>
                </header>

                {/* Form */}
                <div className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Full name</label>
                        <div className="relative flex items-center">
                            <User size={18} className="absolute left-2 text-[#464555]" />
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">
                            Email address
                        </label>
                        <div className="relative flex items-center">
                            <Mail size={18} className="absolute left-2 text-[#464555]" />
                            <input
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
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative flex items-center">
                            <Lock size={18} className="absolute left-2 text-[#464555]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">
                            Confirm password
                        </label>
                        <div className="relative flex items-center">
                            <Lock size={18} className="absolute left-2 text-[#464555]" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <Button fullWidth onClick={handleSignup} className="mt-1">
                        Sign Up
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
                    Already have an account?{" "}
                    <Link
                        to={'/login'}
                        className="text-[#3525cd] font-medium hover:text-[#4f46e5]"
                    >
                        Login
                    </Link>
                </p>
            </main>
        </div>
    );
}
