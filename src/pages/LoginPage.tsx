// import { useState, type KeyboardEvent } from "react";
import { Link /*, useNavigate*/ } from "react-router-dom";
import { Boxes /*, Mail, Lock*/ } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "../components/SocialIcons";
// import EmailVerification from "../components/EmailVerification";
// import { authApi } from "../api/auth.api";
// import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [pendingEmail, setPendingEmail] = useState<string | null>(null);

    // const { login } = useAuth();
    // const navigate = useNavigate();

    // const handleLogin = async () => {
    //     if (!email.trim() || !password) {
    //         setError("Please enter your email and password.");
    //         return;
    //     }
    //     setError(null);
    //     setIsLoading(true);
    //     try {
    //         const res = await authApi.login({ email, password });
    //         if (res.requiresVerification) {
    //             setPendingEmail(email);
    //             return;
    //         }
    //         if (res.data?.accessToken && res.data?.user) {
    //             login(res.data.accessToken, res.data.user);
    //             navigate("/dashboard", { replace: true });
    //         }
    //     } catch (err: any) {
    //         setError(err.response?.data?.message ?? "Login failed. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const onEnter = (e: KeyboardEvent) => {
    //     if (e.key === "Enter") handleLogin();
    // };

    // if (pendingEmail) {
    //     return (
    //         <EmailVerification
    //             email={pendingEmail}
    //             onVerify={async (otp) => {
    //                 const res = await authApi.verifyEmail({
    //                     email: pendingEmail,
    //                     code: otp,
    //                 });
    //                 if (res.data?.accessToken && res.data?.user) {
    //                     login(res.data.accessToken, res.data.user);
    //                     navigate("/dashboard", { replace: true });
    //                 }
    //             }}
    //             onResend={() =>
    //                 authApi.resendVerification({ email: pendingEmail })
    //             }
    //             onSuccess={() => {}}
    //             onBack={() => {
    //                 setPendingEmail(null);
    //                 setError(null);
    //             }}
    //             showBackButton
    //             showAppHeader
    //         />
    //     );
    // }

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
                        Continue to Bull Console
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

                    {/* ── Email ── */}
                    {/* <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Email address
                        </label>
                        <div className="relative flex items-center">
                            <Mail
                                size={16}
                                className="absolute left-3"
                                style={{
                                    color: "var(--color-on-surface-variant)",
                                }}
                            />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="name@company.com"
                                autoComplete="email"
                                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-sm transition-all duration-150 focus:outline-none"
                                style={{
                                    background:
                                        "var(--color-surface-container)",
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
                    </div> */}

                    {/* ── Password ── */}
                    {/* <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                                style={{
                                    color: "var(--color-on-surface-variant)",
                                }}
                            >
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-xs transition-colors duration-150"
                                style={{ color: "var(--color-primary)" }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.color =
                                        "var(--color-primary-fixed)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.color =
                                        "var(--color-primary)")
                                }
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative flex items-center">
                            <Lock
                                size={16}
                                className="absolute left-3"
                                style={{
                                    color: "var(--color-on-surface-variant)",
                                }}
                            />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={onEnter}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-sm transition-all duration-150 focus:outline-none"
                                style={{
                                    background:
                                        "var(--color-surface-container)",
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
                    </div> */}

                    {/* ── Primary CTA ── */}
                    {/* <button
                        id="login-btn"
                        onClick={handleLogin}
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
                        {isLoading ? "Logging in..." : "Login"}
                    </button> */}
                </div>

                {/* ── Divider ── */}
                {/* <div className="relative flex items-center py-4">
                    <div
                        className="grow border-t"
                        style={{ borderColor: "var(--color-outline-variant)" }}
                    />
                    <span
                        className="mx-3 text-xs"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        or
                    </span>
                    <div
                        className="grow border-t"
                        style={{ borderColor: "var(--color-outline-variant)" }}
                    />
                </div> */}

                {/* ── Social buttons ── */}
                <div className="flex flex-col gap-2.5 mb-4">
                    <button
                        id="google-login-btn"
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
                        id="github-login-btn"
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
                </div>

                {/* ── Footer ── */}
                <p
                    className="text-center text-sm"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    <Link
                        to="/"
                        className="font-medium transition-colors duration-150"
                        style={{ color: "var(--color-primary)" }}
                    >
                        {"<- Home Page"}
                    </Link>
                    {/* Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium transition-colors duration-150"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Sign up
                    </Link> */}
                </p>
            </main>
        </div>
    );
}
