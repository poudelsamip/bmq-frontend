export default function ThroughputChart() {
    const xLabels: string[] = [
        "12:00 PM",
        "6:00 PM",
        "12:00 AM",
        "6:00 AM",
        "Now",
    ];
    const gridYs: number[] = [200, 150, 100, 50];

    return (
        <div
            className="flex-1 bg-white p-6 flex flex-col"
            style={{ border: "0.5px solid #c4c5da" }}
        >
            <div className="flex items-center justify-between mb-5">
                <h3
                    className="text-[20px] font-medium"
                    style={{ color: "#151c27", letterSpacing: "-0.01em" }}
                >
                    Throughput (24h)
                </h3>
                <span
                    className="text-[11px] font-medium uppercase"
                    style={{ color: "#444657", letterSpacing: "0.05em" }}
                >
                    Jobs processed / Hour
                </span>
            </div>

            <div className="relative flex-1" style={{ minHeight: 220 }}>
                <svg
                    className="w-full h-full"
                    viewBox="0 0 800 240"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient
                            id="areaGrad"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#0028c2"
                                stopOpacity={0.08}
                            />
                            <stop
                                offset="100%"
                                stopColor="#0028c2"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    {gridYs.map((y) => (
                        <line
                            key={y}
                            x1="0"
                            x2="800"
                            y1={y}
                            y2={y}
                            stroke="#e2e8f8"
                            strokeWidth="1"
                        />
                    ))}
                    <path
                        d="M0,200 Q100,160 200,175 T400,80 T600,120 T800,40 V240 H0 Z"
                        fill="url(#areaGrad)"
                    />
                    <path
                        d="M0,200 Q100,160 200,175 T400,80 T600,120 T800,40"
                        fill="none"
                        stroke="#0028c2"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="400" cy="80" r="5" fill="#0028c2" />
                    <circle
                        cx="400"
                        cy="80"
                        r="9"
                        fill="#0028c2"
                        fillOpacity={0.15}
                    />
                </svg>

                <div className="flex justify-between mt-3 px-0.5">
                    {xLabels.map((l) => (
                        <span
                            key={l}
                            className="text-[11px]"
                            style={{ color: "#444657" }}
                        >
                            {l}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
