import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = ["Features", "How It Works", "Pricing"];

const FEATURES = [
    {
        icon: "⚡",
        title: "One-Minute Setup",
        desc: "Paste your Redis URL. No code changes, no npm installs. You'll see your queues in under 60 seconds.",
        color: "#818cf8",
        bg: "rgba(99,102,241,0.08)",
        border: "rgba(99,102,241,0.18)",
    },
    {
        icon: "🌳",
        title: "Flow Tree Visualization",
        desc: "See the full parent-child job hierarchy in an interactive tree. Understand dependencies at a glance.",
        color: "#22d3ee",
        bg: "rgba(8,145,178,0.08)",
        border: "rgba(8,145,178,0.18)",
    },
    {
        icon: "📡",
        title: "Real-Time SSE Updates",
        desc: "Live job counts stream to your dashboard. Watch jobs move from waiting → active → completed without refreshing.",
        color: "#34d399",
        bg: "rgba(5,150,105,0.08)",
        border: "rgba(5,150,105,0.18)",
    },
    {
        icon: "🔍",
        title: "Job Inspector",
        desc: "Click any failed job and see the full payload, stack trace, error message, and retry count. Debug production in seconds.",
        color: "#fbbf24",
        bg: "rgba(217,119,6,0.08)",
        border: "rgba(217,119,6,0.18)",
    },
    {
        icon: "🔁",
        title: "One-Click Retry",
        desc: "Failed jobs get a Retry button. Click it, the job re-enters the queue immediately. No Redis CLI, no SSH.",
        color: "#c084fc",
        bg: "rgba(124,58,237,0.08)",
        border: "rgba(124,58,237,0.18)",
    },
    {
        icon: "🏢",
        title: "Multi-Project Support",
        desc: "Connect multiple Redis instances — staging, production, different services. Each isolated with its own encrypted connection.",
        color: "#f472b6",
        bg: "rgba(219,39,119,0.08)",
        border: "rgba(219,39,119,0.18)",
    },
];

const STATES = [
    {
        label: "waiting",
        color: "#94a3b8",
        bg: "rgba(148,163,184,0.1)",
        dot: "#94a3b8",
    },
    {
        label: "active",
        color: "#60a5fa",
        bg: "rgba(37,99,235,0.12)",
        dot: "#3b82f6",
    },
    {
        label: "completed",
        color: "#4ade80",
        bg: "rgba(22,163,74,0.12)",
        dot: "#22c55e",
    },
    {
        label: "failed",
        color: "#f87171",
        bg: "rgba(220,38,38,0.12)",
        dot: "#ef4444",
    },
    {
        label: "delayed",
        color: "#fbbf24",
        bg: "rgba(217,119,6,0.12)",
        dot: "#f59e0b",
    },
    {
        label: "paused",
        color: "#c084fc",
        bg: "rgba(124,58,237,0.12)",
        dot: "#a855f7",
    },
];

// const COMPARE = [
//     {
//         feature: "Setup",
//         ours: "Paste Redis URL",
//         board: "Install + configure",
//         arena: "Install + configure",
//     },
//     {
//         feature: "Hosting",
//         ours: "Fully managed",
//         board: "Self-hosted",
//         arena: "Self-hosted",
//     },
//     { feature: "Flow tree", ours: "✓", board: "✗", arena: "✗" },
//     { feature: "Multi-project", ours: "✓", board: "✗", arena: "✗" },
//     {
//         feature: "Code changes",
//         ours: "None",
//         board: "Required",
//         arena: "Required",
//     },
//     {
//         feature: "Live updates",
//         ours: "✓ SSE",
//         board: "Polling",
//         arena: "Polling",
//     },
// ];

const PLANS = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        desc: "Essential monitoring tools for personal projects and getting started.",
        cta: "Current Plan",
        featured: false,
        perks: [
            "2 Projects",
            "Last 30 Jobs",
            "Live Queue Dashboard",
            "Basic Queue Analytics",
            "Standard Support",
        ],
    },
    {
        name: "Pro",
        price: "$9.99",
        period: "/month",
        desc: "Everything you need to monitor, debug, and optimize your BullMQ workloads in production.",
        cta: "Upgrade to Pro",
        featured: true,
        perks: [
            "Unlimited Projects",
            "Complete Job History",
            "Interactive Flow Tree Visualization",
            "Advanced Queue Analytics",
            "Failure Analytics & Insights",
            "Email Alerts for Failed Jobs",
            "Queue Health Monitoring",
            "Priority Support",
        ],
    },
];

type FlowNode = {
    id: string;
    x: number;
    label: string;
    y: number;
    children: string[];
    state: State; // ✅ THIS is the key fix
};

const FLOW_NODES: FlowNode[] = [
    {
        id: "root",
        label: "send-email",
        state: "completed",
        x: 270,
        y: 16,
        children: ["resize", "pdf"],
    },
    {
        id: "resize",
        label: "resize-image",
        state: "completed",
        x: 80,
        y: 110,
        children: ["thumb"],
    },
    {
        id: "pdf",
        label: "generate-pdf",
        state: "failed",
        x: 380,
        y: 110,
        children: [],
    },
    {
        id: "thumb",
        label: "make-thumbnail",
        state: "active",
        x: 40,
        y: 204,
        children: [],
    },
];

type State = "completed" | "active" | "failed" | "waiting";

const STATE_COLORS: Record<
    State,
    {
        dot: string;
        bg: string;
        text: string;
        border: string;
    }
> = {
    completed: {
        dot: "#22c55e",
        bg: "rgba(22,163,74,0.12)",
        text: "#4ade80",
        border: "rgba(22,163,74,0.2)",
    },
    active: {
        dot: "#3b82f6",
        bg: "rgba(37,99,235,0.12)",
        text: "#60a5fa",
        border: "rgba(59,130,246,0.2)",
    },
    failed: {
        dot: "#ef4444",
        bg: "rgba(220,38,38,0.12)",
        text: "#f87171",
        border: "rgba(239,68,68,0.2)",
    },
    waiting: {
        dot: "#94a3b8",
        bg: "rgba(148,163,184,0.08)",
        text: "#94a3b8",
        border: "rgba(148,163,184,0.15)",
    },
};

type Edge = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

function FlowTreeDemo() {
    const [selected, setSelected] = useState<string | null>(null);

    const edges: Edge[] = [];
    FLOW_NODES.forEach((n) => {
        n.children.forEach((cid) => {
            const child = FLOW_NODES.find((x) => x.id === cid);
            if (child) {
                edges.push({
                    x1: n.x + 75,
                    y1: n.y + 32,
                    x2: child.x + 75,
                    y2: child.y,
                });
            }
        });
    });

    return (
        <div style={{ position: "relative", width: "100%", height: 260 }}>
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                {edges.map((e, i) => (
                    <line
                        key={i}
                        x1={e.x1}
                        y1={e.y1}
                        x2={e.x2}
                        y2={e.y2}
                        stroke="#2a3042"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                    />
                ))}
            </svg>
            {FLOW_NODES.map((node) => {
                const sc = STATE_COLORS[node.state] || STATE_COLORS.waiting;
                const isSelected = selected === node.id;
                return (
                    <div
                        key={node.id}
                        onClick={() => setSelected(isSelected ? null : node.id)}
                        style={{
                            position: "absolute",
                            left: node.x,
                            top: node.y,
                            width: 150,
                            background: isSelected ? "#1a1f2e" : "#141820",
                            border: `1px solid ${isSelected ? sc.dot : "#1e2536"}`,
                            borderRadius: 4,
                            padding: "8px 11px",
                            cursor: "pointer",
                            transition: "box-shadow 0.15s, border-color 0.15s",
                            boxShadow: isSelected
                                ? `0 0 0 2px ${sc.dot}33`
                                : "none",
                            zIndex: 2,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: sc.dot,
                                    flexShrink: 0,
                                }}
                            />
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#e2e8f0",
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                {node.label}
                            </span>
                        </div>
                        <div
                            style={{
                                marginTop: 5,
                                display: "inline-block",
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                padding: "2px 6px",
                                borderRadius: 2,
                                background: sc.bg,
                                color: sc.text,
                                textTransform: "uppercase",
                                border: `1px solid ${sc.border}`,
                            }}
                        >
                            {node.state}
                        </div>
                        {isSelected && node.state === "failed" && (
                            <div
                                style={{
                                    marginTop: 6,
                                    fontSize: 10,
                                    color: "#f87171",
                                    background: "rgba(239,68,68,0.08)",
                                    borderRadius: 3,
                                    padding: "4px 6px",
                                    border: "1px solid rgba(239,68,68,0.15)",
                                }}
                            >
                                Error: SMTP timeout after 30s
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function MockDashboard() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick((x) => x + 1), 2000);
        return () => clearInterval(t);
    }, []);

    const queues = [
        {
            name: "email-queue",
            waiting: (tick % 5) + 1,
            active: tick % 2,
            completed: 47 + tick,
            failed: 2,
        },
        {
            name: "image-resize",
            waiting: 0,
            active: (tick % 3) + 1,
            completed: 891,
            failed: 0,
        },
        {
            name: "pdf-generator",
            waiting: tick % 3,
            active: 0,
            completed: 23,
            failed: tick % 4 === 0 ? 1 : 0,
        },
    ];

    return (
        <div
            style={{
                background: "#0d1117",
                borderRadius: 4,
                border: "1px solid #1e2536",
                overflow: "hidden",
                fontFamily: "'JetBrains Mono', monospace",
            }}
        >
            <div
                style={{
                    background: "#0a0e16",
                    borderBottom: "1px solid #1e2536",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <div
                    style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#3a3a3a",
                    }}
                />
                <div
                    style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#3a3a3a",
                    }}
                />
                <div
                    style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#3a3a3a",
                    }}
                />
                <span style={{ marginLeft: 8, fontSize: 11, color: "#3d4e6a" }}>
                    bullconsole.com/dashboard
                </span>
                <span
                    style={{
                        marginLeft: "auto",
                        fontSize: 10,
                        color: "#4ade80",
                        background: "rgba(74,222,128,0.08)",
                        padding: "2px 8px",
                        borderRadius: 2,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        border: "1px solid rgba(74,222,128,0.15)",
                    }}
                >
                    <span
                        style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#4ade80",
                            display: "inline-block",
                            animation: "pulse 2s infinite",
                        }}
                    />
                    LIVE
                </span>
            </div>
            <div style={{ padding: 14 }}>
                <div
                    style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#3d4e6a",
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    production-redis · 3 queues
                </div>
                {queues.map((q) => (
                    <div
                        key={q.name}
                        style={{
                            background: "#0a0e16",
                            border: "1px solid #1a2030",
                            borderRadius: 3,
                            padding: "10px 14px",
                            marginBottom: 6,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "#8b9ab5",
                                flex: 1,
                            }}
                        >
                            {q.name}
                        </span>
                        {[
                            { label: "wait", val: q.waiting, color: "#64748b" },
                            {
                                label: "active",
                                val: q.active,
                                color: "#60a5fa",
                            },
                            {
                                label: "done",
                                val: q.completed,
                                color: "#4ade80",
                            },
                            { label: "fail", val: q.failed, color: "#f87171" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{ textAlign: "center", minWidth: 36 }}
                            >
                                <div
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color:
                                            s.val > 0 && s.label === "fail"
                                                ? "#f87171"
                                                : s.color,
                                        lineHeight: 1,
                                    }}
                                >
                                    {s.val}
                                </div>
                                <div
                                    style={{
                                        fontSize: 8,
                                        color: "#3d4e6a",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        marginTop: 3,
                                    }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                        <div
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: 2,
                                background: "rgba(99,102,241,0.1)",
                                border: "1px solid rgba(99,102,241,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                flexShrink: 0,
                            }}
                        >
                            <svg
                                width="10"
                                height="10"
                                fill="none"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M3 8h10M9 4l4 4-4 4"
                                    stroke="#818cf8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const STEPS = [
    {
        num: "01",
        title: "Connect your Redis",
        body: "Paste your Redis URL into Bull Console. We encrypt it with AES-256-GCM immediately — raw credentials never touch our database.",
        accent: "#818cf8",
    },
    {
        num: "02",
        title: "See your queues instantly",
        body: "We connect using BullMQ in read-only mode. Every queue appears within seconds — no code, no config, no deployment.",
        accent: "#22d3ee",
    },
    {
        num: "03",
        title: "Inspect & debug",
        body: "Click into any job. See the payload, error, stack trace, and retry count. One-click retry to requeue failed jobs.",
        accent: "#4ade80",
    },
    {
        num: "04",
        title: "Watch it live",
        body: "SSE pushes job state changes in real time. No polling, no refresh — your dashboard reflects production as it happens.",
        accent: "#fbbf24",
    },
];

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const { isAuthenticated, isLoading } = useAuth();

    const D = {
        bg: "#080b12",
        surface: "#0d1117",
        surface2: "#0a0e16",
        border: "#1a2030",
        border2: "#1e2536",
        text: "#e2e8f0",
        muted: "#4a5568",
        subtle: "#2d3a50",
        accent: "#6366f1",
        accentHover: "#4f46e5",
        accentDim: "rgba(99,102,241,0.1)",
        accentBorder: "rgba(99,102,241,0.2)",
    };

    return (
        <div
            style={{
                fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
                color: D.text,
                background: D.bg,
                minHeight: "100vh",
            }}
        >
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
                rel="stylesheet"
            />
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .nav-link { font-size:14px;font-weight:500;color:#64748b;text-decoration:none;transition:color 0.15s; }
        .nav-link:hover { color:#e2e8f0; }
        .feat-card:hover { border-color: var(--fc) !important; box-shadow: 0 0 0 1px var(--fc); }
        .btn-primary { background:#6366f1;color:#fff;font-size:14px;font-weight:600;padding:11px 24px;border-radius:3px;text-decoration:none;letter-spacing:-0.01em;transition:background 0.15s; display:inline-block; }
        .btn-primary:hover { background:#4f46e5; }
        .btn-secondary { background:transparent;color:#94a3b8;font-size:14px;font-weight:500;padding:11px 24px;border-radius:3px;text-decoration:none;border:1px solid #1e2536;transition:border-color 0.15s,color 0.15s; display:inline-block; }
        .btn-secondary:hover { border-color:#3d4e6a;color:#e2e8f0; }
      `}</style>

            {/* NAV */}
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: scrolled ? "rgba(8,11,18,0.92)" : D.bg,
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: `1px solid ${scrolled ? D.border : "transparent"}`,
                    transition: "all 0.2s",
                    padding: "0 24px",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        height: 58,
                        gap: 32,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontWeight: 700,
                            fontSize: 17,
                            color: D.text,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {/* <div
                            style={{
                                width: 26,
                                height: 26,
                                background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
                                    fill="#fff"
                                    fillOpacity=".9"
                                />
                            </svg>
                        </div> */}
                        <img
                            src="/bull_console.png"
                            alt="Bull Console"
                            style={{ width: 36, height: 36, borderRadius: 10 }}
                        />
                        Bull Console
                    </div>
                    <div style={{ flex: 1 }} />
                    <div
                        style={{
                            display: "flex",
                            gap: 28,
                            alignItems: "center",
                        }}
                    >
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l}
                                className="nav-link"
                                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                            >
                                {l}
                            </a>
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
                        {/* <a
                            href="#"
                            className="nav-link"
                            style={{ marginRight: 4 }}
                        >
                            Log in
                        </a> */}
                        <a
                            href={
                                !isLoading && isAuthenticated
                                    ? "/dashboard"
                                    : "/auth"
                            }
                            className="btn-primary"
                            style={{ fontSize: 13, padding: "8px 16px" }}
                        >
                            Continue
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section
                style={{
                    padding: "90px 24px 70px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 900,
                        height: 400,
                        background:
                            "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        maxWidth: 780,
                        margin: "0 auto",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: D.accentDim,
                            border: `1px solid ${D.accentBorder}`,
                            borderRadius: 2,
                            padding: "5px 12px 5px 7px",
                            marginBottom: 28,
                        }}
                    >
                        <span
                            style={{
                                background: "#6366f1",
                                color: "#fff",
                                fontSize: 9,
                                fontWeight: 700,
                                padding: "2px 7px",
                                borderRadius: 2,
                                letterSpacing: "0.1em",
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            NEW
                        </span>
                        <span
                            style={{
                                fontSize: 12,
                                color: "#818cf8",
                                fontWeight: 500,
                            }}
                        >
                            Flow tree visualization — the only BullMQ Service
                            that has it
                        </span>
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(36px, 5.5vw, 60px)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginBottom: 20,
                            color: D.text,
                        }}
                    >
                        Debug your BullMQ queues
                        <br />
                        <span style={{ color: "#818cf8" }}>in seconds.</span>
                    </h1>
                    <p
                        style={{
                            fontSize: 17,
                            color: "#64748b",
                            lineHeight: 1.75,
                            marginBottom: 36,
                            maxWidth: 520,
                            margin: "0 auto 36px",
                        }}
                    >
                        Connect your Redis URL and get a live dashboard of every
                        job queue, state, and failure — with one-click retry. No
                        code changes required.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 10,
                            flexWrap: "wrap",
                        }}
                    >
                        <a
                            href="/auth"
                            className="btn-primary"
                            style={{ fontSize: 15, padding: "13px 28px" }}
                        >
                            Start for free →
                        </a>
                        <a
                            href="#how-it-works"
                            className="btn-secondary"
                            style={{ fontSize: 15, padding: "13px 28px" }}
                        >
                            See how it works
                        </a>
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            color: D.muted,
                            marginTop: 14,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        No credit card · 1 Redis connection free forever
                    </p>
                </div>

                <div
                    style={{
                        maxWidth: 660,
                        margin: "52px auto 0",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: -30,
                            background:
                                "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />
                    <div style={{ position: "relative" }}>
                        <MockDashboard />
                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section
                style={{
                    padding: "20px 24px",
                    borderTop: `1px solid ${D.border}`,
                    borderBottom: `1px solid ${D.border}`,
                    background: D.surface2,
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 52,
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        { val: "< 60s", label: "setup time" },
                        { val: "Read-only", label: "Redis access" },
                        { val: "AES-256", label: "URL encryption" },
                        { val: "SSE", label: "live updates" },
                        { val: "0 deploys", label: "required" },
                    ].map((s) => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: D.text,
                                    letterSpacing: "-0.02em",
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                {s.val}
                            </div>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: D.muted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginTop: 3,
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" style={{ padding: "88px 24px" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 52 }}>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6366f1",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                marginBottom: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Features
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(26px, 3.5vw, 40px)",
                                fontWeight: 700,
                                letterSpacing: "-0.025em",
                                color: D.text,
                                marginBottom: 12,
                            }}
                        >
                            Everything you need to understand your queues
                        </h2>
                        <p
                            style={{
                                fontSize: 15,
                                color: "#64748b",
                                maxWidth: 480,
                                margin: "0 auto",
                            }}
                        >
                            Built for Node.js developers who run BullMQ in
                            production and need visibility without overhead.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: 1,
                            background: D.border,
                            border: `1px solid ${D.border}`,
                        }}
                    >
                        {FEATURES.map((f) => (
                            <div
                                key={f.title}
                                className="feat-card"
                                style={
                                    {
                                        "--fc": f.color,
                                        background: D.surface,
                                        padding: "28px 26px",
                                        transition: "border-color 0.2s",
                                        border: `1px solid transparent`,
                                        position: "relative",
                                        overflow: "hidden",
                                    } as React.CSSProperties & {
                                        "--fc": string;
                                    }
                                }
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 1,
                                        background: `linear-gradient(90deg, transparent, ${f.color}33, transparent)`,
                                    }}
                                />
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 3,
                                        background: f.bg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20,
                                        marginBottom: 14,
                                        border: `1px solid ${f.border}`,
                                    }}
                                >
                                    {f.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 650,
                                        color: D.text,
                                        marginBottom: 8,
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#64748b",
                                        lineHeight: 1.7,
                                        margin: 0,
                                    }}
                                >
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FLOW TREE SECTION */}
            <section
                style={{
                    padding: "80px 24px",
                    background: D.surface2,
                    borderTop: `1px solid ${D.border}`,
                    borderBottom: `1px solid ${D.border}`,
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 52,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6366f1",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                marginBottom: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Flow Tree
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(24px, 3vw, 36px)",
                                fontWeight: 700,
                                letterSpacing: "-0.025em",
                                color: D.text,
                                marginBottom: 14,
                            }}
                        >
                            Visualize job hierarchies no one else shows you
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#64748b",
                                lineHeight: 1.75,
                                marginBottom: 20,
                            }}
                        >
                            BullMQ supports parent-child job flows. Bull Console
                            renders this as an interactive tree so you can trace
                            exactly where a workflow broke.
                        </p>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            {[
                                "See which parent triggered each child job",
                                "Color-coded states across the full tree",
                                "Click any node to inspect payload & errors",
                            ].map((item) => (
                                <li
                                    key={item}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        fontSize: 14,
                                        color: "#8b9ab5",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#6366f1",
                                            fontWeight: 700,
                                            flexShrink: 0,
                                            fontFamily:
                                                "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        →
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        style={{
                            background: D.surface,
                            border: `1px solid ${D.border}`,
                            borderRadius: 4,
                            padding: "24px 20px",
                            overflowY: "auto",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: D.muted,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                marginBottom: 14,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Interactive — click a node ↓
                        </div>
                        <FlowTreeDemo />
                        <div
                            style={{
                                marginTop: 18,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 6,
                            }}
                        >
                            {STATES.map((s) => (
                                <span
                                    key={s.label}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 5,
                                        fontSize: 10,
                                        fontWeight: 600,
                                        color: s.color,
                                        background: s.bg,
                                        padding: "3px 8px",
                                        borderRadius: 2,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        fontFamily:
                                            "'JetBrains Mono', monospace",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            background: s.dot,
                                        }}
                                    />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" style={{ padding: "88px 24px" }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 52 }}>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6366f1",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                marginBottom: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            How it works
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(24px, 3.5vw, 38px)",
                                fontWeight: 700,
                                letterSpacing: "-0.025em",
                                color: D.text,
                            }}
                        >
                            From zero to debugging in four steps
                        </h2>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                        }}
                    >
                        {STEPS.map((step, i) => (
                            <div
                                key={step.num}
                                style={{
                                    display: "flex",
                                    gap: 28,
                                    position: "relative",
                                    paddingBottom:
                                        i < STEPS.length - 1 ? 36 : 0,
                                }}
                            >
                                {i < STEPS.length - 1 && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: 22,
                                            top: 52,
                                            bottom: 0,
                                            width: 1,
                                            background: D.border2,
                                        }}
                                    />
                                )}
                                <div style={{ flexShrink: 0 }}>
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 3,
                                            background: `${step.accent}0d`,
                                            border: `1px solid ${step.accent}25`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: step.accent,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            fontFamily:
                                                "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        {step.num}
                                    </div>
                                </div>
                                <div style={{ paddingTop: 12 }}>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 650,
                                            color: D.text,
                                            marginBottom: 6,
                                        }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: "#64748b",
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VS COMPARISON */}
            {/* <section
                style={{
                    padding: "80px 24px",
                    background: D.surface2,
                    borderTop: `1px solid ${D.border}`,
                }}
            >
                <div style={{ maxWidth: 780, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6366f1",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                marginBottom: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Comparison
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(22px, 3vw, 34px)",
                                fontWeight: 700,
                                letterSpacing: "-0.025em",
                                color: D.text,
                                marginBottom: 10,
                            }}
                        >
                            Why not Bull Board or Arena?
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#64748b",
                                maxWidth: 520,
                                margin: "0 auto",
                            }}
                        >
                            They're self-hosted npm packages you install into
                            your codebase. Bull Console is a managed service —
                            zero installation, zero maintenance.
                        </p>
                    </div>
                    <div
                        style={{
                            background: D.surface,
                            border: `1px solid ${D.border}`,
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontSize: 13,
                            }}
                        >
                            <thead>
                                <tr style={{ background: D.surface2 }}>
                                    <th
                                        style={{
                                            textAlign: "left",
                                            padding: "11px 16px",
                                            fontWeight: 600,
                                            color: D.muted,
                                            fontSize: 11,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                        }}
                                    >
                                        Feature
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "center",
                                            padding: "11px 16px",
                                            fontWeight: 700,
                                            color: "#818cf8",
                                            fontSize: 12,
                                            fontFamily:
                                                "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        Bull Console
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "center",
                                            padding: "11px 16px",
                                            fontWeight: 600,
                                            color: D.muted,
                                            fontSize: 12,
                                        }}
                                    >
                                        Bull Board
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "center",
                                            padding: "11px 16px",
                                            fontWeight: 600,
                                            color: D.muted,
                                            fontSize: 12,
                                        }}
                                    >
                                        Arena
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE.map((row, i) => (
                                    <tr
                                        key={row.feature}
                                        style={{
                                            borderTop: `1px solid ${D.border}`,
                                            background:
                                                i % 2 === 0
                                                    ? D.surface
                                                    : D.surface2,
                                        }}
                                    >
                                        <td
                                            style={{
                                                padding: "10px 16px",
                                                color: "#8b9ab5",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {row.feature}
                                        </td>
                                        <td
                                            style={{
                                                padding: "10px 16px",
                                                textAlign: "center",
                                                color:
                                                    row.ours === "✓"
                                                        ? "#4ade80"
                                                        : "#818cf8",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {row.ours}
                                        </td>
                                        <td
                                            style={{
                                                padding: "10px 16px",
                                                textAlign: "center",
                                                color:
                                                    row.board === "✗"
                                                        ? "#f87171"
                                                        : "#64748b",
                                            }}
                                        >
                                            {row.board}
                                        </td>
                                        <td
                                            style={{
                                                padding: "10px 16px",
                                                textAlign: "center",
                                                color:
                                                    row.arena === "✗"
                                                        ? "#f87171"
                                                        : "#64748b",
                                            }}
                                        >
                                            {row.arena}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section> */}

            {/* SECURITY SECTION */}
            <section
                id="security"
                style={{
                    padding: "80px 24px",
                    borderTop: `1px solid ${D.border}`,
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 48,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6366f1",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                marginBottom: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Security
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(22px, 3vw, 34px)",
                                fontWeight: 700,
                                letterSpacing: "-0.025em",
                                color: D.text,
                                marginBottom: 12,
                            }}
                        >
                            Your Redis credentials are treated with care
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#64748b",
                                lineHeight: 1.75,
                            }}
                        >
                            We encrypt every Redis URL with AES-256-GCM before
                            it touches our database, and decrypt only in-memory
                            during request processing. We never log credentials.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
                    >
                        {[
                            {
                                icon: "🔐",
                                label: "AES-256-GCM encryption",
                                sub: "Redis URLs encrypted at rest, Only decrypted in memory during request processing",
                            },
                            {
                                icon: "👁",
                                label: "Read-only access",
                                sub: "We only write when you explicitly retry or delete a job",
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    alignItems: "flex-start",
                                    background: D.surface,
                                    border: `1px solid ${D.border}`,
                                    borderRadius: 3,
                                    padding: "12px 14px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 16,
                                        flexShrink: 0,
                                        marginTop: 1,
                                    }}
                                >
                                    {s.icon}
                                </span>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 650,
                                            color: D.text,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: D.muted,
                                            marginTop: 2,
                                        }}
                                    >
                                        {s.sub}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section
                id="pricing"
                style={{
                    padding: "88px 24px",
                    background: D.surface2,
                    borderTop: `1px solid ${D.border}`,
                }}
            >
                <div style={{ maxWidth: 960, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 48 }}>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#6366f1",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                marginBottom: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Pricing
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(24px, 3.5vw, 38px)",
                                fontWeight: 700,
                                letterSpacing: "-0.025em",
                                color: D.text,
                                marginBottom: 10,
                            }}
                        >
                            Simple, honest pricing
                        </h2>
                        <p style={{ fontSize: 14, color: "#64748b" }}>
                            $9.99/month is low enough to expense without a
                            meeting. Start free, upgrade when you see the value.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: 1,
                            background: D.border,
                            border: `1px solid ${D.border}`,
                        }}
                    >
                        {PLANS.map((plan) => (
                            <div
                                key={plan.name}
                                style={{
                                    background: plan.featured
                                        ? "#0d1117"
                                        : D.surface,
                                    padding: "28px 24px",
                                    position: "relative",
                                }}
                            >
                                {plan.featured && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 2,
                                            background:
                                                "linear-gradient(90deg, #6366f1, #8b5cf6)",
                                        }}
                                    />
                                )}
                                <div
                                    style={{
                                        marginBottom: 4,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: plan.featured
                                            ? "#818cf8"
                                            : D.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        fontFamily:
                                            "'JetBrains Mono', monospace",
                                    }}
                                >
                                    {plan.name}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: 2,
                                        marginBottom: 6,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 38,
                                            fontWeight: 700,
                                            color: D.text,
                                            letterSpacing: "-0.03em",
                                        }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span
                                        style={{ fontSize: 13, color: D.muted }}
                                    >
                                        {plan.period}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#64748b",
                                        marginBottom: 20,
                                    }}
                                >
                                    {plan.desc}
                                </p>
                                <a
                                    href="#"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        padding: "10px 0",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: 13,
                                        textDecoration: "none",
                                        background: plan.featured
                                            ? "#6366f1"
                                            : "transparent",
                                        color: plan.featured
                                            ? "#fff"
                                            : "#64748b",
                                        marginBottom: 20,
                                        border: plan.featured
                                            ? "none"
                                            : `1px solid ${D.border2}`,
                                        opacity: plan.name === "Team" ? 0.5 : 1,
                                        cursor:
                                            plan.name === "Team"
                                                ? "not-allowed"
                                                : "pointer",
                                        transition: "background 0.15s",
                                    }}
                                >
                                    {plan.cta}
                                </a>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    {plan.perks.map((p) => (
                                        <li
                                            key={p}
                                            style={{
                                                display: "flex",
                                                gap: 8,
                                                fontSize: 13,
                                                color: "#8b9ab5",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: plan.featured
                                                        ? "#818cf8"
                                                        : "#4a5568",
                                                    fontWeight: 700,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                ✓
                                            </span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: D.muted,
                            marginTop: 20,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        Cancel anytime
                    </p>
                </div>
            </section>

            {/* CTA BANNER */}
            <section
                style={{
                    padding: "80px 24px",
                    background: D.bg,
                    borderTop: `1px solid ${D.border}`,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        width: 700,
                        height: 300,
                        background:
                            "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        maxWidth: 560,
                        margin: "0 auto",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#6366f1",
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            marginBottom: 14,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        Get started
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(24px, 3.5vw, 40px)",
                            fontWeight: 700,
                            color: D.text,
                            letterSpacing: "-0.025em",
                            marginBottom: 12,
                        }}
                    >
                        Start debugging in under a minute.
                    </h2>
                    <p
                        style={{
                            fontSize: 15,
                            color: "#64748b",
                            marginBottom: 30,
                        }}
                    >
                        Paste your Redis URL. See your queues. No code changes,
                        no installs, no infrastructure.
                    </p>
                    <a
                        href="/auth"
                        className="btn-primary"
                        style={{ fontSize: 15, padding: "13px 32px" }}
                    >
                        Get Started Free →
                    </a>
                    <p
                        style={{
                            fontSize: 12,
                            color: D.muted,
                            marginTop: 14,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        Free tier available · No credit card required
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                style={{
                    padding: "32px 24px",
                    borderTop: `1px solid ${D.border}`,
                    background: D.surface2,
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontWeight: 700,
                            fontSize: 15,
                            color: D.text,
                        }}
                    >
                        <img
                            src="/bull_console.png"
                            alt="Bull Console"
                            style={{ width: 36, height: 36, borderRadius: 10 }}
                        />
                        Bull Console
                    </div>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {[
                            { label: "Privacy", url: "/privacy" },
                            { label: "Terms", url: "/terms" },
                            { label: "Security", url: "#security" },
                        ].map((l) => (
                            <a
                                key={l.label}
                                href={l.url}
                                style={{
                                    fontSize: 12,
                                    color: D.muted,
                                    textDecoration: "none",
                                }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            color: D.subtle,
                            margin: 0,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        © 2026 Bull Console | All rights reserved
                    </p>
                </div>
            </footer>
        </div>
    );
}
