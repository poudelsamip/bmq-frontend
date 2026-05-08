interface Segment {
    label: string;
    pct: number;
    color: string;
}

export default function StatusDistribution() {
    const segments: Segment[] = [
        { label: "Success", pct: 80.2, color: "#0028c2" },
        { label: "Failed", pct: 14.8, color: "#ba1a1a" },
        { label: "Waiting", pct: 5.0, color: "#747689" },
    ];

    let acc = 0;
    const stops = segments
        .map(({ color, pct }) => {
            const from = acc;
            acc += pct;
            return `${color} ${from}% ${acc}%`;
        })
        .join(", ");

    return (
        <div
            className="w-72 shrink-0 bg-white p-6 flex flex-col"
            style={{ border: "0.5px solid #c4c5da" }}
        >
            <h3
                className="text-[20px] font-medium mb-5"
                style={{ color: "#151c27", letterSpacing: "-0.01em" }}
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
                    <div
                        className="absolute flex flex-col items-center justify-center bg-white rounded-full"
                        style={{ width: 108, height: 108 }}
                    >
                        <span
                            className="text-[22px] font-medium"
                            style={{
                                color: "#151c27",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            92%
                        </span>
                        <span
                            className="text-[10px] font-medium uppercase"
                            style={{
                                color: "#444657",
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
                                    style={{ color: "#151c27" }}
                                >
                                    {label}
                                </span>
                            </div>
                            <span
                                className="text-[12px] font-medium"
                                style={{ color: "#151c27" }}
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
