import { useState, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Boxes, User, Mail, Lock } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "../components/SocialIcons";
import EmailVerification from "../components/EmailVerification";
import { authApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

/* ── reusable dark-mode field helper ──────────────────────────── */
function Field({
    id,
    label,
    type,
    value,
    onChange,
    onKeyDown,
    placeholder,
    autoComplete,
    icon: Icon,
}: {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    autoComplete: string;
    icon: React.ElementType;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-sm font-medium"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {label}
            </label>
            <div className="relative flex items-center">
                <Icon
                    size={16}
                    className="absolute left-3"
                    style={{ color: "var(--color-on-surface-variant)" }}
                />
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-sm transition-all duration-150 focus:outline-none"
                    style={{
                        background: "var(--color-surface-container)",
                        color: "var(--color-on-surface)",
                        border: "1px solid var(--color-outline-variant)",
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                            "var(--color-primary)";
                        e.currentTarget.style.boxShadow =
                            "0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                            "var(--color-outline-variant)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                />
            </div>
        </div>
    );
}

/* ── SignupPage ────────────────────────────────────────────────── */
export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showVerification, setShowVerification] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

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

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSignup();
    };

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
                onBack={() => {
                    setShowVerification(false);
                    setError(null);
                }}
                showBackButton
                showAppHeader
            />
        );
    }

    return (
        <div
            className="min-h-screen flex items-start sm:items-center justify-center px-4 py-6"
            style={{
                background: "var(--color-background)",
                color: "var(--color-on-surface)",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <main
                className="w-full max-w-md rounded-md p-6 sm:p-8 flex flex-col my-6"
                style={{
                    background: "var(--color-surface-container-low)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {/* ── Header ── */}
                <header className="flex flex-col items-center mb-6 text-center">
                    <div className="flex items-center gap-2.5 mb-2">
                        <div
                            className="flex items-center justify-center w-9 h-9 rounded-sm"
                            style={{
                                background: "var(--color-primary-container)",
                            }}
                        >
                            <Boxes
                                size={20}
                                style={{
                                    color: "var(--color-on-primary-container)",
                                }}
                            />
                        </div>
                        <h1
                            className="text-xl font-semibold tracking-tight"
                            style={{
                                color: "var(--color-on-surface)",
                                fontFamily: "Manrope, sans-serif",
                            }}
                        >
                            Bull Console
                        </h1>
                    </div>
                    <p
                        className="text-sm"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Create your account
                    </p>
                </header>

                <div className="flex flex-col gap-4">
                    {/* ── Error banner ── */}
                    {/* {error && (
                        <div
                            className="text-sm p-3 rounded-sm"
                            style={{
                                background: "var(--color-error-container)",
                                color: "var(--color-on-error-container)",
                                border: "1px solid var(--color-error)",
                            }}
                        >
                            {error}
                        </div>
                    )} */}

                    {/* <Field
                        id="fullName"
                        label="Full name"
                        type="text"
                        value={fullName}
                        onChange={setFullName}
                        onKeyDown={onEnter}
                        placeholder="John Doe"
                        autoComplete="name"
                        icon={User}
                    />

                    <Field
                        id="email"
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        onKeyDown={onEnter}
                        placeholder="name@company.com"
                        autoComplete="email"
                        icon={Mail}
                    />

                    <Field
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        onKeyDown={onEnter}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        icon={Lock}
                    />

                    <Field
                        id="confirmPassword"
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        onKeyDown={onEnter}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        icon={Lock}
                    /> */}

                    {/* ── Primary CTA ── */}
                    {/* <button
                        id="signup-btn"
                        onClick={handleSignup}
                        disabled={isLoading}
                        className="w-full py-2.5 text-sm font-semibold rounded-sm mt-1 transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                            background: "var(--color-primary)",
                            color: "var(--color-on-primary)",
                        }}
                        onMouseOver={(e) => {
                            if (!isLoading)
                                e.currentTarget.style.background =
                                    "var(--color-primary-fixed)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary)";
                        }}
                    >
                        {isLoading ? "Creating account..." : "Sign up"}
                    </button> */}

                    {/* ── Divider ── */}
                    {/* <div className="relative flex items-center py-1">
                        <div
                            className="grow border-t"
                            style={{
                                borderColor: "var(--color-outline-variant)",
                            }}
                        />
                        <span
                            className="mx-3 text-xs"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            or
                        </span>
                        <div
                            className="grow border-t"
                            style={{
                                borderColor: "var(--color-outline-variant)",
                            }}
                        />
                    </div> */}

                    {/* ── Social buttons ── */}
                    <button
                        id="google-signup-btn"
                        onClick={() => {
                            window.location.href =
                                "http://localhost:3000/api/auth/google";
                        }}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 text-sm font-medium rounded-sm transition-all duration-150 active:scale-[0.98]"
                        style={{
                            background: "var(--color-surface-container)",
                            color: "var(--color-on-surface)",
                            border: "1px solid var(--color-outline-variant)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-surface-container-high)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-surface-container)";
                        }}
                    >
                        <GoogleIcon /> Continue with Google
                    </button>

                    <button
                        id="github-signup-btn"
                        onClick={() => {
                            window.location.href =
                                "http://localhost:3000/api/auth/github";
                        }}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 text-sm font-medium rounded-sm transition-all duration-150 active:scale-[0.98]"
                        style={{
                            background: "var(--color-surface-container)",
                            color: "var(--color-on-surface)",
                            border: "1px solid var(--color-outline-variant)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-surface-container-high)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-surface-container)";
                        }}
                    >
                        <div className="bg-white rounded-full">
                            <GitHubIcon />
                        </div>
                        Continue with GitHub
                    </button>

                    {/* ── Footer ── */}
                    {/* <p
                        className="text-center text-xs"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium transition-colors duration-150"
                            style={{ color: "var(--color-primary)" }}
                        >
                            Login
                        </Link>
                    </p> */}
                </div>
            </main>
        </div>
    );
}
