import { useState, useEffect } from "react";
import { MailCheck, Boxes } from "lucide-react";

interface EmailVerificationProps {
    email: string;
    title?: string;
    subtitle?: string;

    onVerify: (otp: string) => Promise<void>;
    onResend: () => Promise<void>;

    onSuccess?: () => void;
    onBack?: () => void;

    showBackButton?: boolean;
    showAppHeader?: boolean;
}

export default function EmailVerification({
    email,
    title    = "Verify your email",
    subtitle = "A 6-digit verification code has been sent to your email",

    onVerify,
    onResend,
    onSuccess,
    onBack,

    showBackButton = false,
    showAppHeader  = true,
}: EmailVerificationProps) {
    const [otp,       setOtp]       = useState("");
    const [error,     setError]     = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown,  setCooldown]  = useState(0);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError("Please enter the 6-digit code.");
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            await onVerify(otp);
            onSuccess?.();
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid or expired code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;
        setError(null);
        try {
            await onResend();
            setCooldown(60);
        } catch {
            setError("Failed to resend code.");
        }
    };

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
                className="w-full max-w-md rounded-xl p-6 sm:p-8 flex flex-col my-6"
                style={{
                    background: "var(--color-surface-container-low)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {/* ── App header ── */}
                {showAppHeader && (
                    <header className="flex flex-col items-center mb-5 text-center">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                style={{ background: "var(--color-primary-container)" }}
                            >
                                <Boxes size={20} style={{ color: "var(--color-on-primary-container)" }} />
                            </div>
                            <h1
                                className="text-xl font-semibold tracking-tight"
                                style={{ color: "var(--color-on-surface)", fontFamily: "Manrope, sans-serif" }}
                            >
                                Bull Vortex
                            </h1>
                        </div>
                    </header>
                )}

                {/* ── Back button ── */}
                {showBackButton && (
                    <button
                        onClick={onBack}
                        className="text-sm mb-4 text-left transition-colors duration-150"
                        style={{ color: "var(--color-on-surface-variant)" }}
                        onMouseOver={e => (e.currentTarget.style.color = "var(--color-primary)")}
                        onMouseOut={e => (e.currentTarget.style.color = "var(--color-on-surface-variant)")}
                    >
                        ← Back
                    </button>
                )}

                {/* ── Body ── */}
                <div className="flex flex-col items-center">
                    {/* icon badge */}
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "var(--color-primary-container)" }}
                    >
                        <MailCheck size={24} style={{ color: "var(--color-on-primary-container)" }} />
                    </div>

                    <h2
                        className="text-lg font-semibold mb-1"
                        style={{ color: "var(--color-on-surface)", fontFamily: "Manrope, sans-serif" }}
                    >
                        {title}
                    </h2>

                    <p
                        className="text-sm text-center mb-5 leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        {subtitle}
                        <br />
                        <strong style={{ color: "var(--color-primary)" }}>{email}</strong>
                    </p>

                    {/* ── Error banner ── */}
                    {error && (
                        <div
                            className="w-full text-sm px-3 py-2.5 rounded-lg mb-4"
                            style={{
                                background: "var(--color-error-container)",
                                color: "var(--color-on-error-container)",
                                border: "1px solid var(--color-error)",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {/* ── OTP input ── */}
                    <input
                        id="otp-input"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        maxLength={6}
                        placeholder="Enter code"
                        className="w-full text-center text-lg tracking-[0.35em] rounded-lg py-3 px-4 mb-4 transition-all duration-150 focus:outline-none"
                        style={{
                            background: "var(--color-surface-container)",
                            color: "var(--color-on-surface)",
                            border: "1px solid var(--color-outline-variant)",
                        }}
                        onFocus={e => {
                            e.currentTarget.style.borderColor = "var(--color-primary)";
                            e.currentTarget.style.boxShadow =
                                "0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent)";
                        }}
                        onBlur={e => {
                            e.currentTarget.style.borderColor = "var(--color-outline-variant)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    />

                    {/* ── Verify button ── */}
                    <button
                        id="verify-btn"
                        onClick={handleVerify}
                        disabled={isLoading}
                        className="w-full py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                            background: "var(--color-primary)",
                            color: "var(--color-on-primary)",
                        }}
                        onMouseOver={e => { if (!isLoading) e.currentTarget.style.background = "var(--color-primary-fixed)"; }}
                        onMouseOut={e => { e.currentTarget.style.background = "var(--color-primary)"; }}
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </button>

                    {/* ── Resend ── */}
                    <p
                        className="text-xs mt-4 text-center"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Didn't receive the code?{" "}
                        <button
                            id="resend-btn"
                            onClick={handleResend}
                            disabled={cooldown > 0}
                            className="font-medium transition-colors duration-150 disabled:cursor-not-allowed"
                            style={{
                                color: cooldown > 0 ? "var(--color-outline)" : "var(--color-primary)",
                            }}
                            onMouseOver={e => {
                                if (cooldown === 0)
                                    e.currentTarget.style.color = "var(--color-primary-fixed)";
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.color =
                                    cooldown > 0 ? "var(--color-outline)" : "var(--color-primary)";
                            }}
                        >
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
}
