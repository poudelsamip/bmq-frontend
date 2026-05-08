const HEADER_ACTIONS: string[] = ["Pause Queue", "Purge"];

interface QueueHeaderProps {
    queueName: string | null;
    onViewAllJobs: () => void;
}

export default function QueueHeader({
    queueName,
    onViewAllJobs,
}: QueueHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <h2
                    className="text-[24px] font-medium"
                    style={{ color: "#151c27", letterSpacing: "-0.01em" }}
                >
                    {queueName || "Queue"}
                </h2>
                <span
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium"
                    style={{
                        borderRadius: 9999,
                        background: "rgba(0,40,194,0.08)",
                        color: "#0028c2",
                        border: "0.5px solid rgba(0,40,194,0.25)",
                        letterSpacing: "0.02em",
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#0028c2" }}
                    />
                    Live
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onViewAllJobs}
                    className="px-4 py-2 text-[13px] font-medium text-white"
                    style={{
                        background: "#0028c2",
                        borderRadius: 4,
                        letterSpacing: "0.02em",
                    }}
                >
                    View All Jobs
                </button>
                {HEADER_ACTIONS.map((label) => (
                    <button
                        key={label}
                        className="px-4 py-2 text-[13px] font-medium"
                        style={{
                            background: "#fff",
                            color: "#151c27",
                            border: "0.5px solid #c4c5da",
                            borderRadius: 4,
                            letterSpacing: "0.02em",
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
