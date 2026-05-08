interface StatCardProps {
    label: string;
    value: string;
    valueColor?: string;
}

function StatCard({ label, value, valueColor }: StatCardProps) {
    return (
        <div
            className="flex-1 p-4 bg-white flex flex-col gap-2 min-w-0"
            style={{ border: "0.5px solid #c4c5da" }}
        >
            <span
                className="text-[11px] font-medium uppercase"
                style={{ color: "#444657", letterSpacing: "0.05em" }}
            >
                {label}
            </span>
            <span
                className="text-[32px] font-medium leading-none"
                style={{
                    color: valueColor ?? "#151c27",
                    letterSpacing: "-0.02em",
                }}
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
