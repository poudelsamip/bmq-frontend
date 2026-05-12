interface StatCardProps {
    label: string;
    value: string;
    valueColor?: string;
}

function getValueColor(label: string): string {
    const lower = label.toLowerCase();
    if (lower === "failed") return "var(--color-error)";
    if (lower === "active") return "var(--color-primary)";
    return "var(--color-on-surface)";
}

function StatCard({ label, value, valueColor }: StatCardProps) {
    const color = valueColor ?? getValueColor(label);
    return (
        <div
            className="flex-1 p-4 flex flex-col gap-2 min-w-0"
            style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
            }}
        >
            <span
                className="text-[10px] font-bold uppercase"
                style={{
                    color: "var(--color-on-surface-variant)",
                    letterSpacing: "0.05em",
                }}
            >
                {label}
            </span>
            <span
                className="text-[32px] font-semibold leading-none"
                style={{ color, letterSpacing: "-0.02em" }}
            >
                {value}
            </span>
        </div>
    );
}

interface QueueStatsProps {
    queueStats: {
        [index: string]: number;
    } | null;
}

export default function QueueStats({ queueStats }: QueueStatsProps) {
    console.log("Rendering QueueStats with data:", queueStats);
    return (
        <div className="flex gap-4">
            {queueStats &&
                Object.entries(queueStats).map(([label, value]) => (
                    <StatCard
                        key={label}
                        label={label}
                        value={value.toString()}
                    />
                ))}
        </div>
    );
}
