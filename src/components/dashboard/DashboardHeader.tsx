import { Bell, HelpCircle } from "lucide-react";

interface DashboardHeaderProps {
    title: string;
    onCreateJob?: () => void;
}

export default function DashboardHeader({ title, onCreateJob }: DashboardHeaderProps) {
    return (
        <header
            className="fixed top-0 right-0 h-16 flex items-center justify-between px-6 z-10 backdrop-blur-md"
            style={{
                left: 220,
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderBottom: "1px solid #c4c5da",
            }}
        >
            <h2 className="text-xl font-semibold" style={{ color: "#0038ff" }}>
                {title}
            </h2>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:opacity-70"
                        style={{ color: "#444657" }}
                        aria-label="Notifications"
                    >
                        <Bell className="w-[18px] h-[18px]" />
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:opacity-70"
                        style={{ color: "#444657" }}
                        aria-label="Help"
                    >
                        <HelpCircle className="w-[18px] h-[18px]" />
                    </button>
                </div>
                <button
                    onClick={onCreateJob}
                    className="px-4 py-2 text-sm font-medium rounded-sm text-white transition-opacity hover:opacity-90 shadow-sm"
                    style={{ backgroundColor: "#0038ff" }}
                >
                    Create Job
                </button>
            </div>
        </header>
    );
}
