interface PlanUsageBannerProps {
    used: number;
    total: number;
    onUpgrade?: () => void;
}

export default function PlanUsageBanner({ used, total, onUpgrade }: PlanUsageBannerProps) {
    const percent = Math.min((used / total) * 100, 100);

    return (
        <div
            className="flex items-center justify-between px-4 py-3 rounded-lg"
            style={{
                backgroundColor: "var(--color-surface-container-low)",
                border: "1px solid var(--color-outline-variant)",
            }}
        >
            {/* Left: label + bar + count */}
            <div className="flex items-center gap-4">
                <span
                    className="uppercase tracking-widest whitespace-nowrap"
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--color-on-surface-variant)",
                    }}
                >
                    Plan Usage
                </span>

                {/* Progress bar */}
                <div
                    className="overflow-hidden rounded-full"
                    style={{
                        width: 192,
                        height: 6,
                        backgroundColor: "var(--color-surface-container-highest)",
                    }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${percent}%`,
                            backgroundColor: "var(--color-primary)",
                        }}
                    />
                </div>

                <span
                    className="whitespace-nowrap font-medium"
                    style={{ fontSize: 12, color: "var(--color-on-surface)" }}
                >
                    {used} / {total} projects used
                </span>
            </div>

            {/* Right: upgrade link */}
            <button
                onClick={onUpgrade}
                className="font-medium transition-opacity hover:underline whitespace-nowrap"
                style={{ fontSize: 12, color: "var(--color-primary)" }}
            >
                Upgrade Plan
            </button>
        </div>
    );
}
