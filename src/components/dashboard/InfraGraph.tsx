export interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
    isHub?: boolean;
}

export interface GraphEdge {
    from: string;
    to: string;
}

interface InfraGraphProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export default function InfraGraph({ nodes, edges }: InfraGraphProps) {
    const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

    const width = 600;
    const height = 200;

    return (
        <div
            className="relative rounded-sm overflow-hidden flex justify-center"
            style={{
                backgroundColor: "#f0f3ff",
                border: "1px solid #c4c5da",
                padding: "48px",
            }}
        >
            {/* Atmospheric background hub icon */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ opacity: 0.05 }}
                aria-hidden="true"
            >
                {/* Large SVG circle blobs mimicking the material hub icon background */}
                <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <circle cx="100" cy="150" r="80" fill="#0038ff" />
                    <circle cx="300" cy="150" r="80" fill="#0038ff" />
                    <circle cx="200" cy="100" r="80" fill="#0038ff" />
                </svg>
            </div>

            {/* Graph SVG */}
            <div className="relative z-10 flex flex-col items-center w-full">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full"
                    style={{ maxHeight: 180 }}
                    aria-label="Global Infrastructure Graph"
                >
                    {/* Edges */}
                    {edges.map((edge, i) => {
                        const from = nodeMap[edge.from];
                        const to = nodeMap[edge.to];
                        if (!from || !to) return null;
                        return (
                            <line
                                key={i}
                                x1={from.x}
                                y1={from.y}
                                x2={to.x}
                                y2={to.y}
                                stroke="#747689"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => {
                        const labelWidth = node.label.length * 7.2 + 24;
                        return (
                            <g key={node.id}>
                                <rect
                                    x={node.x - labelWidth / 2}
                                    y={node.y - 14}
                                    width={labelWidth}
                                    height={28}
                                    rx={2}
                                    ry={2}
                                    fill="#ffffff"
                                    stroke={node.isHub ? "#747689" : "#747689"}
                                    strokeWidth={1}
                                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
                                />
                                <text
                                    x={node.x}
                                    y={node.y + 5}
                                    textAnchor="middle"
                                    fontSize={node.isHub ? 12 : 11}
                                    fontFamily="Inter, ui-sans-serif, sans-serif"
                                    fontWeight={node.isHub ? "500" : "400"}
                                    fill="#151c27"
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
