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
                    className="text-[24px] font-semibold"
                    style={{
                        color: "var(--color-on-surface)",
                        letterSpacing: "-0.01em",
                    }}
                >
                    {queueName || "Queue"}
                </h2>
                <span
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase"
                    style={{
                        borderRadius: 9999,
                        background: "rgba(183,196,255,0.1)",
                        color: "var(--color-primary)",
                        border: "1px solid rgba(183,196,255,0.25)",
                        letterSpacing: "0.05em",
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: "var(--color-primary)" }}
                    />
                    Live
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onViewAllJobs}
                    className="px-4 py-1.5 text-[13px] font-semibold transition-opacity hover:opacity-90"
                    style={{
                        background: "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        borderRadius: 2,
                        letterSpacing: "0.02em",
                    }}
                >
                    View All Jobs
                </button>
                {HEADER_ACTIONS.map((label) => (
                    <button
                        key={label}
                        className="px-3 py-1.5 text-[13px] font-medium transition-colors"
                        style={{
                            background: "transparent",
                            color: "var(--color-on-surface)",
                            border: "1px solid var(--color-outline)",
                            borderRadius: 2,
                            letterSpacing: "0.02em",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                "var(--color-surface-container-low)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
