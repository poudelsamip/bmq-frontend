interface QueueHeaderProps {
    queueName: string | null;
    onViewAllJobs: () => void;
    onPauseQueue?: () => void;
    isPausing?: boolean;
    isPaused?: boolean;
}

export default function QueueHeader({
    queueName,
    onViewAllJobs,
    onPauseQueue,
    isPausing = false,
    isPaused = false,
}: QueueHeaderProps) {
    const isBusy = isPausing;

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
                        background: isPaused ? "rgba(239,68,68,0.1)" : "rgba(183,196,255,0.1)",
                        color: isPaused ? "var(--color-error)" : "var(--color-primary)",
                        border: `1px solid ${isPaused ? "rgba(239,68,68,0.25)" : "rgba(183,196,255,0.25)"}`,
                        letterSpacing: "0.05em",
                    }}
                >
                    {!isPaused && (
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: "var(--color-primary)" }}
                        />
                    )}
                    {isPaused ? "Paused" : "Live"}
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

                <button
                    onClick={onPauseQueue}
                    disabled={isBusy || !onPauseQueue}
                    className="px-3 py-1.5 text-[13px] font-medium transition-colors"
                    style={{
                        background: "transparent",
                        color: isPausing
                            ? "var(--color-primary)"
                            : "var(--color-on-surface)",
                        border: "1px solid var(--color-outline)",
                        borderRadius: 2,
                        letterSpacing: "0.02em",
                        opacity: !onPauseQueue ? 0.45 : 1,
                        cursor: isBusy || !onPauseQueue ? "default" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                        if (!isBusy && onPauseQueue)
                            e.currentTarget.style.background =
                                "var(--color-surface-container-low)";
                    }}
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                    }
                >
                    {isPausing ? (isPaused ? "Resuming…" : "Pausing…") : (isPaused ? "Resume Queue" : "Pause Queue")}
                </button>

            </div>
        </div>
    );
}
