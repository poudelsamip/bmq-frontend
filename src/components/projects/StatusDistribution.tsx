interface Segment {
    label: string;
    pct: number;
    color: string;
}

export default function StatusDistribution() {
    const segments: Segment[] = [
        { label: "Success", pct: 80.2, color: "var(--color-primary)" },
        { label: "Failed",  pct: 14.8, color: "var(--color-error)" },
        { label: "Waiting", pct: 5.0,  color: "var(--color-on-surface-variant)" },
    ];

    // conic-gradient requires resolved colour values — use the same hex
    // that index.css assigns so the chart renders correctly.
    const resolvedColors = ["#b7c4ff", "#ffb4ab", "#c4c5d7"];
    let acc = 0;
    const stops = segments
        .map(({ pct }, i) => {
            const from = acc;
            acc += pct;
            return `${resolvedColors[i]} ${from}% ${acc}%`;
        })
        .join(", ");

    return (
        <div
            className="w-72 shrink-0 p-6 flex flex-col"
            style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
            }}
        >
            <h3
                className="text-[20px] font-semibold mb-5"
                style={{
                    color: "var(--color-on-surface)",
                    letterSpacing: "-0.01em",
                }}
            >
                Status Distribution
            </h3>

            <div className="flex flex-col items-center justify-center flex-1">
                {/* Donut */}
                <div
                    className="relative flex items-center justify-center"
                    style={{ width: 160, height: 160 }}
                >
                    <div
                        style={{
                            width: 160,
                            height: 160,
                            borderRadius: "50%",
                            background: `conic-gradient(${stops})`,
                        }}
                    />
                    {/* Hole — must match card background */}
                    <div
                        className="absolute flex flex-col items-center justify-center rounded-full"
                        style={{
                            width: 108,
                            height: 108,
                            background: "var(--color-surface-container)",
                        }}
                    >
                        <span
                            className="text-[22px] font-semibold"
                            style={{
                                color: "var(--color-on-surface)",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            92%
                        </span>
                        <span
                            className="text-[10px] font-bold uppercase"
                            style={{
                                color: "var(--color-on-surface-variant)",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Health
                        </span>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-6 w-full flex flex-col gap-2.5">
                    {segments.map(({ label, pct, color }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                                <span
                                    className="text-[12px]"
                                    style={{ color: "var(--color-on-surface)" }}
                                >
                                    {label}
                                </span>
                            </div>
                            <span
                                className="text-[12px] font-medium"
                                style={{ color: "var(--color-on-surface)" }}
                            >
                                {pct}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
