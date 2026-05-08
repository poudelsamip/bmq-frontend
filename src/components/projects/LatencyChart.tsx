import { useState } from "react";

const BAR_DATA: number[] = [
    40, 45, 50, 85, 35, 42, 38, 45, 48, 40, 30, 35, 65, 40, 42, 38, 45, 48, 40,
    30, 35, 40, 42, 55,
];
const X_LABELS: string[] = [
    "-24 Hours",
    "-18 Hours",
    "-12 Hours",
    "-6 Hours",
    "Live",
];

export default function LatencyChart() {
    const [hovered, setHovered] = useState<number | null>(null);
    const max = Math.max(...BAR_DATA);

    return (
        <div className="bg-white p-6" style={{ border: "0.5px solid #c4c5da" }}>
            <div className="flex items-center justify-between mb-6">
                <h3
                    className="text-[20px] font-medium"
                    style={{ color: "#151c27", letterSpacing: "-0.01em" }}
                >
                    Latency Analysis
                </h3>
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-sm"
                        style={{ background: "#0028c2" }}
                    />
                    <span
                        className="text-[11px] font-medium uppercase"
                        style={{ color: "#444657", letterSpacing: "0.05em" }}
                    >
                        AVG Processing (ms)
                    </span>
                </div>
            </div>

            <div className="flex items-end gap-1.5 h-52">
                {BAR_DATA.map((h, i) => {
                    const isSpike = h >= 60;
                    const heightPct = (h / max) * 100;
                    const isHovered = hovered === i;
                    return (
                        <div
                            key={i}
                            className="flex-1 rounded-t-sm cursor-pointer transition-all duration-150"
                            style={{
                                height: `${heightPct}%`,
                                background:
                                    isHovered || isSpike
                                        ? "#0028c2"
                                        : "rgba(0,40,194,0.18)",
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            title={`${h} ms`}
                        />
                    );
                })}
            </div>

            <div className="flex justify-between mt-3 px-0.5">
                {X_LABELS.map((l) => (
                    <span
                        key={l}
                        className="text-[11px]"
                        style={{
                            color: l === "Live" ? "#0028c2" : "#444657",
                            fontWeight: l === "Live" ? 600 : 400,
                        }}
                    >
                        {l}
                    </span>
                ))}
            </div>
        </div>
    );
}
