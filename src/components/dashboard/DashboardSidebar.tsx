import { NavLink } from "react-router-dom";

interface NavItem {
    label: string;
    icon: string;
    to: string;
    end?: boolean;
}

const navItems: NavItem[] = [
    { label: "Projects", icon: "folder", to: "/dashboard", end: true },
    { label: "Billing", icon: "payments", to: "/dashboard/billing" },
    { label: "Settings", icon: "settings", to: "/dashboard/settings" },
];

export default function DashboardSidebar() {
    return (
        <aside
            className="fixed left-0 top-0 h-full flex flex-col py-6 z-20 transition-all duration-200"
            style={{
                width: 220,
                backgroundColor: "var(--color-surface-container-low)",
                borderRight: "1px solid var(--color-outline-variant)",
            }}
        >
            {/* Logo */}
            <div className="px-4 mb-8">
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "var(--color-primary-container)" }}
                    >
                        <span
                            className="material-symbols-outlined text-sm"
                            style={{ color: "var(--color-on-primary-container)", fontSize: 18 }}
                        >
                            bolt
                        </span>
                    </div>
                    <div>
                        <h1
                            className="leading-none font-bold"
                            style={{
                                fontFamily: "Manrope, sans-serif",
                                fontSize: 18,
                                color: "var(--color-primary)",
                            }}
                        >
                            Bull Vortex
                        </h1>
                        <span
                            className="uppercase tracking-widest"
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                color: "var(--color-on-surface-variant)",
                            }}
                        >
                            Infrastructure
                        </span>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {navItems.map(({ label, icon, to, end }) => (
                    <NavLink
                        key={label}
                        to={to}
                        end={end}
                        className="flex items-center gap-3 py-3 text-sm font-medium transition-colors duration-150 outline-none"
                        style={({ isActive }) =>
                            isActive
                                ? {
                                      borderLeft: "4px solid var(--color-primary)",
                                      color: "var(--color-primary)",
                                      backgroundColor: "rgba(183, 196, 255, 0.10)",
                                      paddingLeft: "12px",
                                      paddingRight: "16px",
                                  }
                                : {
                                      color: "var(--color-on-surface-variant)",
                                      paddingLeft: "16px",
                                      paddingRight: "16px",
                                  }
                        }
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            if (!el.classList.contains("active")) {
                                el.style.color = "var(--color-on-surface)";
                                el.style.backgroundColor = "var(--color-surface-container-high)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            if (!el.getAttribute("aria-current")) {
                                el.style.color = "";
                                el.style.backgroundColor = "";
                            }
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 20 }}
                        >
                            {icon}
                        </span>
                        <span style={{ fontSize: 14 }}>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Profile at bottom */}
            <div style={{ borderTop: "1px solid var(--color-outline-variant)", paddingTop: 16 }}>
                <NavLink
                    to="/dashboard/profile"
                    className="flex items-center gap-3 py-3 text-sm font-medium transition-colors duration-150 outline-none"
                    style={({ isActive }) =>
                        isActive
                            ? {
                                  borderLeft: "4px solid var(--color-primary)",
                                  color: "var(--color-primary)",
                                  backgroundColor: "rgba(183, 196, 255, 0.10)",
                                  paddingLeft: "12px",
                                  paddingRight: "16px",
                              }
                            : {
                                  color: "var(--color-on-surface-variant)",
                                  paddingLeft: "16px",
                                  paddingRight: "16px",
                              }
                    }
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (!el.getAttribute("aria-current")) {
                            el.style.color = "var(--color-on-surface)";
                            el.style.backgroundColor = "var(--color-surface-container-high)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (!el.getAttribute("aria-current")) {
                            el.style.color = "";
                            el.style.backgroundColor = "";
                        }
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                        account_circle
                    </span>
                    <span style={{ fontSize: 14 }}>Profile</span>
                </NavLink>
            </div>
        </aside>
    );
}
