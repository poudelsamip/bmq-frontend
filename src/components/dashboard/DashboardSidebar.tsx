import { NavLink } from "react-router-dom";
import { FolderOpen, CreditCard, Settings, User } from "lucide-react";

const navItems = [
    { label: "Projects", icon: FolderOpen, to: "/dashboard" },
    { label: "Billing", icon: CreditCard, to: "/dashboard/billing" },
    { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

export default function DashboardSidebar() {
    return (
        <aside
            className="fixed left-0 top-0 bottom-0 flex flex-col py-4 border-r z-20 transition-all duration-200"
            style={{
                width: 220,
                backgroundColor: "#f0f3ff",
                borderColor: "#c4c5da",
            }}
        >
            {/* Logo */}
            <div className="px-5 mb-8">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#0038ff" }}
                    >
                        {/* <img
                            src="src/assets/bull_vortex.png"
                            alt="Bull Vortex Logo"
                        /> */}
                        <p
                            className="text-lg font-black leading-none"
                            style={{ color: "#fff" }}
                        >
                            BV
                        </p>
                    </div>
                    <div>
                        <p
                            className="text-2xl font-bold leading-none"
                            style={{ color: "#0038ff" }}
                        >
                            Bull Vortex
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1">
                {navItems.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={label}
                        to={to}
                        end={to === "/dashboard"}
                        className="flex items-center gap-3 py-3 text-sm font-medium transition-colors duration-150"
                        style={({ isActive }) =>
                            isActive
                                ? {
                                      borderLeft: "4px solid #0038ff",
                                      color: "#0038ff",
                                      backgroundColor: "rgba(187,195,255,0.2)",
                                      paddingLeft: "16px",
                                      paddingRight: "20px",
                                  }
                                : {
                                      color: "#444657",
                                      paddingLeft: "20px",
                                      paddingRight: "20px",
                                  }
                        }
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Profile at bottom */}
            <div style={{ borderTop: "1px solid #c4c5da", paddingTop: "24px" }}>
                <NavLink
                    to="/dashboard/profile"
                    className="flex items-center gap-3 py-3 text-sm font-medium transition-colors duration-150"
                    style={({ isActive }) =>
                        isActive
                            ? {
                                  borderLeft: "4px solid #0038ff",
                                  color: "#0038ff",
                                  backgroundColor: "rgba(187,195,255,0.2)",
                                  paddingLeft: "16px",
                                  paddingRight: "20px",
                              }
                            : {
                                  color: "#444657",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                              }
                    }
                >
                    <User className="w-4 h-4 shrink-0" />
                    Profile
                </NavLink>
            </div>
        </aside>
    );
}
