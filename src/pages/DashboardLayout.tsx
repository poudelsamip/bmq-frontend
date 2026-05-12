import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const PAGE_TITLES: Record<string, string> = {
    "/dashboard": "Projects",
    "/dashboard/billing": "Billing",
    "/dashboard/settings": "Settings",
    "/dashboard/profile": "Profile",
};

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const title = PAGE_TITLES[pathname] ?? "Dashboard";

    return (
        <div
            className="min-h-screen flex"
            style={{ backgroundColor: "var(--color-background)", color: "var(--color-on-surface)" }}
        >
            {/* Fixed sidebar — 220px wide */}
            <DashboardSidebar />

            {/* Main area offset by sidebar width */}
            <div className="flex-1 flex flex-col" style={{ marginLeft: 220 }}>
                {/* Fixed top header */}
                <DashboardHeader title={title} />

                {/* Page content — padded below header */}
                <main
                    className="flex-1 overflow-y-auto"
                    style={{ marginTop: 64, padding: "24px" }}
                >
                    {/* <div style={{ maxWidth: 1440, margin: "0 auto" }}> */}
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
