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
            <div
                className="rounded p-6 flex items-center gap-5"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                <div
                    className="w-16 h-16 rounded flex items-center justify-center text-xl font-bold shrink-0 select-none"
                    style={{
                        background: "var(--color-primary-container)",
                        color: "var(--color-on-primary-container)",
                        fontFamily: "Manrope, sans-serif",
                    }}
                >
                    {initials}
                </div>
                <div>
                    <p
                        className="text-base font-bold"
                        style={{ color: "var(--color-on-surface)", fontFamily: "Manrope ,sans-serif" }}
                    >
                        {user?.name ?? "—"}
                    </p>
                    <p
                        className="text-sm mt-0.5"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        {user?.email.toLowerCase() ?? "—"}
                    </p>
                    <span
                        className="inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold rounded capitalize"
                        style={{
                            background: "var(--color-surface-container-high)",
                            color: "var(--color-primary)",
                            border: "1px solid var(--color-outline-variant)",
                        }}
                    >
                        {user?.plan ?? "free"} plan
                    </span>
                </div>
            </div>

            {/* Details */}
            <div
                className="rounded overflow-hidden"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {[
                    { Icon: UserCircle, label: "Full Name", value: user?.name ?? "—" },
                    { Icon: Mail, label: "Email", value: user?.email ?? "—" },
                    { Icon: Shield, label: "Plan", value: user?.plan ?? "starter" },
                ].map(({ Icon, label, value }, i, arr) => (
                    <div
                        key={label}
                        className="flex items-center gap-3 px-5 py-4"
                        style={
                            i < arr.length - 1
                                ? { borderBottom: "1px solid var(--color-outline-variant)" }
                                : {}
                        }
                    >
                        <Icon
                            className="w-4 h-4 shrink-0"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        />
                        <span
                            className="text-sm w-24 shrink-0"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            {label}
                        </span>
                        <span
                            className={`${i === 2 ? "capitalize" : ""} text-sm font-medium`}
                            style={{ color: "var(--color-on-surface)" }}
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Sign out */}
            <button
                onClick={logout}
                className="flex items-center gap-2 self-start px-4 py-2.5 text-sm font-semibold rounded transition-opacity hover:opacity-80"
                style={{
                    border: "1px solid var(--color-error)",
                    color: "var(--color-error)",
                }}
            >
                <LogOut className="w-4 h-4" />
                Sign out
            </button>
        </div>
    );
}
