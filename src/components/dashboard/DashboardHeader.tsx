import { NavLink } from "react-router-dom";

interface DashboardHeaderProps {
    title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
    return (
        <header
            className="fixed top-0 right-0 h-16 flex items-center justify-between px-6 z-50"
            style={{
                left: 220,
                backgroundColor: "rgba(19, 18, 28, 0.90)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--color-outline-variant)",
            }}
        >
            {/* Page title */}
            <div className="flex items-center gap-4">
                <h2
                    style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 20,
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                        lineHeight: 1,
                    }}
                >
                    {title}
                </h2>
            </div>

            {/* Account */}
            <NavLink
                to="/dashboard/profile"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ color: "var(--color-on-surface-variant)" }}
                aria-label="Account"
                onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)")
                }
            >
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
                    account_circle
                </span>
            </NavLink>

        </header>
    );
}
