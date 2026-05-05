import { useState } from "react";
import { GoogleIcon, GitHubIcon } from "../components/SocialIcons";
import { Boxes, User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { authApi } from "../api/auth.api";
import EmailVerification from "../components/EmailVerification";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await authApi.signup({ name: fullName, email, password });
            setCurrentStep(2);
        } catch (err: any) {
            let message = "An error occurred during signup.";

            if (err.response?.data) {
                const errorData = err.response.data;

                // Handle validation errors (ZodError format)
                if (errorData.errors && typeof errorData.errors === "object") {
                    // Extract first validation error from any field
                    const fieldErrors = Object.values(errorData.errors);
                    if (
                        fieldErrors.length > 0 &&
                        Array.isArray(fieldErrors[0])
                    ) {
                        message =
                            fieldErrors[0][0] || errorData.message || message;
                    } else {
                        message = errorData.message || message;
                    }
                } else {
                    // Handle other error types
                    message = errorData.message || message;
                }
            }

            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyEmail = async (otp: string) => {
        const res = await authApi.verifyEmail({ email, code: otp });
        login(res.data.accessToken, res.data.user);
        navigate("/dashboard");
    };

    const handleResendCode = async () => {
        await authApi.resendVerification({ email });
    };

    const onVerificationSuccess = () => {
        navigate("/dashboard");
    };

    const backToSignup = () => {
        setCurrentStep(1);
        setError(null);
    };

    return (
        <>
            {currentStep === 1 ? (
                <div className="bg-[#f7f9fb] min-h-screen flex items-start sm:items-center justify-center px-4 py-6 text-[#191c1e]">
                    <main className="w-full max-w-md bg-white border border-[#e0e3e5] rounded p-5 sm:p-7 flex flex-col my-6">
                        {/* Header */}
                        <header className="flex flex-col items-center mb-5 text-center">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center justify-center w-9 h-9 bg-[#4f46e5] rounded">
                                    <Boxes
                                        size={20}
                                        className="text-[#dad7ff]"
                                    />
                                </div>
                                <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                                    Bull Vortex
                                </h1>
                            </div>
                            <p className="text-sm text-[#464555]">
                                Create your account
                            </p>
                        </header>

                        <div className="flex flex-col gap-4">
                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded border border-red-100">
                                    {error}
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">
                                    Full name
                                </label>
                                <div className="relative flex items-center">
                                    <User
                                        size={18}
                                        className="absolute left-2 text-[#464555]"
                                    />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
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
                                    <Mail
                                        size={18}
                                        className="absolute left-2 text-[#464555]"
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="name@company.com"
                                        className="w-full border border-[#e0e3e5] rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <Lock
                                        size={18}
                                        className="absolute left-2 text-[#464555]"
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                                    <Lock
                                        size={18}
                                        className="absolute left-2 text-[#464555]"
                                    />
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

                            <Button
                                fullWidth
                                onClick={handleSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing up..." : "Sign Up"}
                            </Button>

                            <div className="relative flex items-center py-3">
                                <div className="grow border-t border-[#e0e3e5]" />
                                <span className="mx-3 text-xs text-[#464555] uppercase tracking-wide">
                                    or
                                </span>
                                <div className="grow border-t border-[#e0e3e5]" />
                            </div>

                            <Button
                                variant="social"
                                fullWidth
                                onClick={() =>
                                    (window.location.href = "http://localhost:3000/api/auth/google")
                                }
                            >
                                <GoogleIcon />
                                Continue with Google
                            </Button>

                            <Button
                                variant="social"
                                fullWidth
                                onClick={() =>
                                    (window.location.href = "http://localhost:3000/api/auth/github")
                                }
                            >
                                <GitHubIcon />
                                Continue with GitHub
                            </Button>

                            <p className="text-center text-xs text-[#464555]">
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#3525cd]">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </main>
                </div>
            ) : (
                <EmailVerification
                    email={email}
                    onVerify={handleVerifyEmail}
                    onResend={handleResendCode}
                    onSuccess={onVerificationSuccess}
                    onBack={backToSignup}
                    showBackButton={true}
                    showAppHeader={true}
                />
            )}
        </>
    );
}
