import { useAuth } from "../context/AuthContext";
import { LogOut, UserCircle, Mail, Shield } from "lucide-react";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "??";

    return (
        <div className="flex flex-col gap-6 max-w-lg">
            {/* Avatar + name */}
            <div className="bg-white border border-slate-300 rounded-lg p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold shrink-0 select-none">
                    {initials}
                </div>
                <div>
                    <p className="text-base font-bold text-slate-800">
                        {user?.name ?? "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {user?.email ?? "—"}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded border border-indigo-300 capitalize">
                        {user?.plan ?? "starter"} plan
                    </span>
                </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-slate-300 rounded-lg overflow-hidden divide-y divide-slate-200">
                <div className="flex items-center gap-3 px-5 py-4">
                    <UserCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 w-24 shrink-0">
                        Full Name
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                        {user?.name ?? "—"}
                    </span>
                </div>
                <div className="flex items-center gap-3 px-5 py-4">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 w-24 shrink-0">
                        Email
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                        {user?.email ?? "—"}
                    </span>
                </div>
                <div className="flex items-center gap-3 px-5 py-4">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 w-24 shrink-0">
                        Plan
                    </span>
                    <span className="text-sm font-medium text-slate-700 capitalize">
                        {user?.plan ?? "starter"}
                    </span>
                </div>
            </div>

            {/* Sign out */}
            <button
                onClick={logout}
                className="flex items-center gap-2 self-start px-4 py-2.5 border border-red-300 text-red-600 text-sm font-semibold rounded-md hover:bg-red-50 transition-colors"
            >
                <LogOut className="w-4 h-4" />
                Sign out
            </button>
        </div>
    );
}
