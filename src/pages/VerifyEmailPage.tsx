// src/pages/VerifyEmailPage.tsx
import { MailCheck } from "lucide-react";
import Button from "../components/ui/Button";

export default function VerifyEmailPage() {
    return (
        <div className="bg-[#f7f9fb] min-h-screen flex items-start sm:items-center justify-center px-4 py-6 text-[#191c1e]">
            <main className="w-full max-w-md bg-white border border-[#e0e3e5] rounded py-5 sm:py-15 flex flex-col items-center text-center my-6">
                
                {/* Header */}
                {/* <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-9 h-9 bg-[#4f46e5] rounded">
                        <span className="text-[#dad7ff] text-sm font-semibold">
                            BV
                        </span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                        Bull Vortex
                    </h1>
                </div> */}

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center bg-[#eef2ff] rounded-full mb-4">
                    <MailCheck className="w-6 h-6 text-[#4f46e5]" />
                </div>

                {/* Content */}
                <h2 className="text-base font-semibold mb-2">
                    Enter verification code
                </h2>

                <p className="text-sm text-[#464555] mb-5">
                    Enter the 6-digit code sent to your email
                </p>

                <div className="flex flex-col items-center mb-5">
    
    {/* OTP Inputs */}
    <div className="flex gap-2 mb-4">
        {[...Array(6)].map((_, i) => (
            <input
                key={i}
                type="text"
                maxLength={1}
                className="w-10 h-11 text-center text-sm border border-[#e0e3e5] rounded-sm focus:outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/10"
            />
        ))}
    </div>

    {/* Verify Button */}
    <Button fullWidth className="max-w-[260px]">
        Verify
    </Button>

</div>

                {/* Resend */}
                <p className="text-xs text-[#464555]">
                    Didn’t receive the code?{" "}
                    <Button variant="ghost" className="font-medium">
                        Resend
                    </Button>
                </p>
            </main>
        </div>
    );
}