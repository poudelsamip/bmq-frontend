import { useState, useEffect } from "react";
import { MailCheck, Boxes } from "lucide-react";
import Button from "./ui/Button";

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
    title = "Verify your email",
    subtitle = "A 6 digit verification code has been sent to your email",

    onVerify,
    onResend,
    onSuccess,
    onBack,

    showBackButton = false,
    showAppHeader = true,
}: EmailVerificationProps) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

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
        } catch (err: any) {
            setError("Failed to resend code.");
        }
    };

    return (
        <div className="bg-[#f7f9fb] min-h-screen flex items-start sm:items-center justify-center px-4 py-6 text-[#191c1e]">
            <main className="w-full max-w-md bg-white border border-[#e0e3e5] rounded p-5 sm:p-7 flex flex-col my-6">
                {showAppHeader && (
                    <header className="flex flex-col items-center mb-5 text-center">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-9 h-9 bg-[#4f46e5] rounded flex items-center justify-center">
                                <Boxes size={20} className="text-[#dad7ff]" />
                            </div>
                            <h1 className="text-lg font-semibold">
                                Bull Vortex
                            </h1>
                        </div>
                    </header>
                )}

                {showBackButton && (
                    <button
                        onClick={onBack}
                        className="text-sm mb-3 text-[#464555] hover:text-[#3525cd] transition-colors"
                    >
                        ← Back
                    </button>
                )}

                <div className="flex flex-col items-center">
                    <MailCheck className="mb-4 text-[#4f46e5]" />

                    <h2 className="font-semibold mb-1">{title}</h2>

                    <p className="text-sm text-center text-[#464555] mb-4">
                        {subtitle}
                        <br />
                        <strong className="text-[#191c1e]">{email}</strong>
                    </p>

                    {error && (
                        <div className="w-full bg-red-50 text-red-600 text-sm px-3 py-2.5 rounded border border-red-100 mb-4">
                            {error}
                        </div>
                    )}

                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        placeholder="Enter code"
                        className="
                        w-full text-center text-lg tracking-[0.3em]
                        border border-[#e0e3e5] rounded-sm
                        py-3 px-4 mb-3
                        bg-white
                        transition-all duration-150
                        focus:outline-none
                        focus:border-[#3525cd]
                        focus:ring-2 focus:ring-[#3525cd]/10
                        hover:border-[#c7c9cc]
                        placeholder:text-[#9ca3af]
                    "
                    />

                    <Button
                        fullWidth
                        onClick={handleVerify}
                        disabled={isLoading}
                        className="
                        transition-all duration-150
                        hover:shadow-sm
                        active:scale-[0.99]
                    "
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </Button>

                    <p className="text-xs text-[#464555] mt-3 text-center">
                        Didn’t receive the code?{" "}
                        <button
                            onClick={handleResend}
                            disabled={cooldown > 0}
                            className="
                                    font-medium
                                    text-[#3525cd]
                                    hover:text-[#4f46e5]
                                    transition-colors duration-150
                                    disabled:text-[#9ca3af]
                                    disabled:cursor-not-allowed
                                "
                        >
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
}
