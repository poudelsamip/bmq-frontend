import { BarChart2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white text-xs text-slate-500 border-t mt-16 border-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <BarChart2 size={20} className="text-[#4f46e5]" />
                        Bull Vortex
                    </span>
                    <span>
                        © 2024 Bull Vortex. Institutional-grade precision.
                    </span>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center md:justify-end gap-6">
                    {[
                        "Privacy Policy",
                        "Terms of Service",
                        "Security",
                        "Status",
                    ].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-slate-400 hover:text-slate-600 hover:underline transition-all"
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
