import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "social" | "outline" | "danger";
    fullWidth?: boolean;
}

export default function Button({
    variant = "primary",
    fullWidth = false,
    className = "",
    children,
    ...props
}: ButtonProps) {
    const base =
        "font-medium focus:outline-none transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        /** Indigo filled — main CTAs */
        primary:
            "text-sm text-white bg-[#4f46e5] rounded-sm py-2 hover:bg-[#4338ca] hover:shadow-sm",

        /** Text-only link style */
        ghost: "text-sm text-[#3525cd] bg-transparent rounded-sm py-0 hover:text-[#4f46e5]",

        /** Bordered neutral — OAuth / social login buttons */
        social: "text-sm text-[#191c1e] bg-white border border-[#e0e3e5] rounded-sm py-2 flex items-center justify-center gap-2 hover:bg-[#f0f2f5] hover:border-[#b0b3b8]",

        /** Bordered white — secondary hero CTAs */
        outline:
            "text-sm text-slate-800 bg-white border border-[#c7c4d8] rounded py-3 px-6 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-[#b5b2c8]",

        danger: "text-sm text-white bg-red-600 rounded-sm py-2 px-2 hover:bg-red-700 hover:shadow-sm",
    };

    const width = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${base} ${variants[variant]} ${width} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
