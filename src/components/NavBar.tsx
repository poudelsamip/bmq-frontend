import { Link } from "react-router-dom";
import { BarChart2, ArrowRight, Menu } from "lucide-react";

export default function NavBar() {
    return (
        <nav className="bg-white font-manrope text-sm font-medium tracking-tight border-b border-slate-200 relative z-50">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
                {/* Brand */}
                <Link
                    to={"/"}
                    className="text-xl font-bold tracking-tighter text-slate-900 flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                >
                    <BarChart2 size={22} className="text-[#4f46e5]" />
                    Bull Vortex
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        to={"/pricing"}
                        className="text-slate-600 hover:text-indigo-600 hover:opacity-80 transition-opacity duration-200"
                    >
                        Pricing
                    </Link>
                    <Link
                        to={"/contact"}
                        className="text-slate-600 hover:text-indigo-600 hover:opacity-80 transition-opacity duration-200"
                    >
                        Contact
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        to={"/login"}
                        className="text-slate-600 hover:text-indigo-600 hover:opacity-80 transition-opacity duration-200 hidden sm:block"
                    >
                        Login
                    </Link>
                    <Link
                        to={"/signup"}
                        className="bg-[#4f46e5] text-white text-sm px-4 py-2 rounded flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                    >
                        Sign Up
                        <ArrowRight size={16} />
                    </Link>
                    <button className="md:hidden text-slate-600 p-2">
                        <Menu size={22} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
