interface PlanUsageBannerProps {
    used: number;
    total: number;
    onUpgrade?: () => void;
}

export default function PlanUsageBanner({ used, total, onUpgrade }: PlanUsageBannerProps) {
    const percent = Math.min((used / total) * 100, 100);

    return (
        <div
            className="flex items-center justify-between px-4 py-2 rounded-sm"
            style={{
                backgroundColor: "#f0f3ff",
                border: "1px solid #c4c5da",
            }}
        >
            {/* Left: label + bar + count */}
            <div className="flex items-center gap-4">
                <span
                    className="text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap"
                    style={{ color: "#444657" }}
                >
                    Plan Usage
                </span>

                {/* Progress bar */}
                <div
                    className="w-48 h-2 rounded-sm overflow-hidden"
                    style={{ backgroundColor: "#dce2f3" }}
                >
                    <div
                        className="h-full rounded-sm transition-all duration-500"
                        style={{ width: `${percent}%`, backgroundColor: "#0038ff" }}
                    />
                </div>

                <span className="text-xs font-medium whitespace-nowrap" style={{ color: "#151c27" }}>
                    {used} / {total} projects used
                </span>
            </div>

            {/* Right: upgrade link */}
            <button
                onClick={onUpgrade}
                className="text-xs font-semibold transition-opacity hover:opacity-70 whitespace-nowrap"
                style={{ color: "#0038ff" }}
            >
                Upgrade Plan
            </button>
        </div>
    );
}
