import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QueueStats } from "../../api/queue.api";
import { queueApi } from "../../api/queue.api";

// ── Types ────────────────────────────────────────────────────────────────────

interface QueueCardProps {
    stats: QueueStats;
    projectId: string;
}

// ── Stat config ──────────────────────────────────────────────────────────────

interface StatConfig {
    key: string;
    label: string;
    color: string;
    borderColor: string;
    icon: React.ReactNode;
}

const STAT_CONFIGS: StatConfig[] = [
    {
        key: "completed",
        label: "COMPLETED",
        color: "#4CAF50",
        borderColor: "#4CAF50",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        key: "waiting",
        label: "WAITING",
        color: "#FFA726",
        borderColor: "#FFA726",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        key: "active",
        label: "ACTIVE",
        color: "#66BB6A",
        borderColor: "#66BB6A",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        key: "delayed",
        label: "DELAYED",
        color: "#42A5F5",
        borderColor: "#42A5F5",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v5l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        key: "failed",
        label: "FAILED",
        color: "#EF5350",
        borderColor: "#EF5350",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
            </svg>
        ),
    },
];

// ── Skeleton loader ──────────────────────────────────────────────────────────

const shimmerKeyframes = `
@keyframes qc-shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
}
`;

function SkeletonBox({
    width,
    height,
    borderRadius = 4,
    style,
}: {
    width?: number | string;
    height: number | string;
    borderRadius?: number;
    style?: React.CSSProperties;
}) {
    return (
        <div
            style={{
                width: width ?? "100%",
                height,
                borderRadius,
                background:
                    "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 45%, rgba(255,255,255,0.03) 80%)",
                backgroundSize: "600px 100%",
                animation: "qc-shimmer 2.2s infinite linear",
                ...style,
            }}
        />
    );
}

export function QueueCardSkeleton() {
    return (
        <div
            style={{
                background: "#16171E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4,
                overflow: "hidden",
            }}
        >
            <style>{shimmerKeyframes}</style>

            {/* Header skeleton */}
            <div
                style={{
                    padding: "20px 20px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <SkeletonBox width={44} height={44} borderRadius={4} />
                    <div>
                        <SkeletonBox width={120} height={16} />
                        <SkeletonBox
                            width={80}
                            height={12}
                            style={{ marginTop: 6 }}
                        />
                    </div>
                </div>
                <SkeletonBox width={64} height={28} borderRadius={14} />
            </div>

            {/* Stats skeleton */}
            <div
                style={{
                    padding: "0 20px 16px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 8,
                }}
            >
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonBox key={i} height={90} borderRadius={4} />
                ))}
            </div>

            {/* Buttons skeleton */}
            <div
                style={{
                    padding: "0 20px 20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                }}
            >
                <SkeletonBox height={44} borderRadius={4} />
                <SkeletonBox height={44} borderRadius={4} />
            </div>
        </div>
    );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function QueueCard({ stats, projectId }: QueueCardProps) {
    const navigate = useNavigate();
    const [isPausing, setIsPausing] = useState(false);

    const { queueName, isPaused, counts } = stats;

    const completed = counts?.completed || 0;
    const waiting = counts?.waiting || 0;
    const active = counts?.active || 0;
    const delayed = counts?.delayed || 0;
    const failed = counts?.failed || 0;

    const isLive = !isPaused;

    const handleViewJobs = () => {
        navigate(`queues/${queueName}/jobs`);
    };

    const handlePauseResume = async () => {
        if (isPausing) return;
        setIsPausing(true);
        try {
            if (isPaused) {
                await queueApi.resumeQueue(projectId, queueName);
            } else {
                await queueApi.pauseQueue(projectId, queueName);
            }
        } catch (err) {
            console.error("Failed to pause/resume queue", err);
        } finally {
            setIsPausing(false);
        }
    };

    const statValues: Record<string, number> = {
        completed,
        waiting,
        active,
        delayed,
        failed,
    };

    return (
        <div
            style={{
                background: "#16171E",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(124,107,255,0.25)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
            }
        >
            {/* ── Header ────────────────────────────────────────────── */}
            <div
                style={{
                    padding: "20px 20px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                    {/* Queue icon */}
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 4,
                            background: "rgba(124,107,255,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#7C6BFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="2"
                                y="2"
                                width="20"
                                height="8"
                                rx="2"
                                ry="2"
                            />
                            <rect
                                x="2"
                                y="14"
                                width="20"
                                height="8"
                                rx="2"
                                ry="2"
                            />
                            <line x1="6" y1="6" x2="6.01" y2="6" />
                            <line x1="6" y1="18" x2="6.01" y2="18" />
                        </svg>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#fff",
                                lineHeight: 1.2,
                            }}
                        >
                            {queueName}
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                                color: "rgba(255,255,255,0.4)",
                                marginTop: 2,
                            }}
                        >
                            Queue
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Status badge */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "5px 14px",
                            borderRadius: 14,
                            background: isLive
                                ? "rgba(76,175,80,0.12)"
                                : "rgba(255,167,38,0.12)",
                            border: `1px solid ${isLive ? "rgba(76,175,80,0.3)" : "rgba(255,167,38,0.3)"}`,
                        }}
                    >
                        <div
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: isLive ? "#4CAF50" : "#FFA726",
                                boxShadow: isLive
                                    ? "0 0 6px rgba(76,175,80,0.6)"
                                    : "0 0 6px rgba(255,167,38,0.6)",
                                animation: isLive
                                    ? undefined
                                    : undefined,
                            }}
                        />
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: isLive ? "#4CAF50" : "#FFA726",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {isLive ? "LIVE" : "PAUSED"}
                        </span>
                    </div>

                    {/* Three-dot menu placeholder */}
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            color: "rgba(255,255,255,0.3)",
                            cursor: "pointer",
                            padding: 4,
                            fontSize: 18,
                            lineHeight: 1,
                        }}
                        title="More actions"
                    >
                        ⋮
                    </button>
                </div>
            </div>

            {/* ── Stats row ─────────────────────────────────────────── */}
            <div
                style={{
                    padding: "16px 20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 8,
                }}
            >
                {STAT_CONFIGS.map((cfg) => (
                    <div
                        key={cfg.key}
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: 4,
                            padding: "12px 10px",
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: `3px solid ${cfg.borderColor}`,
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "rgba(255,255,255,0.5)",
                                    letterSpacing: "0.06em",
                                }}
                            >
                                {cfg.label}
                            </span>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                                <span
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: "#E0E0E0",
                                        lineHeight: 1,
                                    }}
                                >
                                    {(statValues[cfg.key] ?? 0).toLocaleString()}
                                </span>
                                <span
                                    style={{
                                        fontSize: 10,
                                        color: "rgba(255,255,255,0.3)",
                                    }}
                                >
                                    jobs
                                </span>
                            </div>
                        </div>
                        <div style={{ color: "#E0E0E0" }}>{cfg.icon}</div>
                    </div>
                ))}
            </div>

            {/* ── Action buttons ─────────────────────────────────────── */}
            <div
                style={{
                    padding: "0 20px 20px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                }}
            >
                <button
                    onClick={handlePauseResume}
                    disabled={isPausing}
                    style={{
                        height: 44,
                        borderRadius: 4,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#E0E0E0",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: isPausing ? "default" : "pointer",
                        opacity: isPausing ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                        if (!isPausing) {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.08)";
                            e.currentTarget.style.borderColor =
                                "rgba(255,255,255,0.2)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                            "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                    }}
                >
                    {isPaused ? (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <polygon points="5,3 19,12 5,21" />
                        </svg>
                    ) : (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    )}
                    {isPausing
                        ? isPaused
                            ? "Resuming…"
                            : "Pausing…"
                        : isPaused
                          ? "Resume"
                          : "Pause"}
                </button>

                <button
                    onClick={handleViewJobs}
                    style={{
                        height: 44,
                        borderRadius: 4,
                        border: "none",
                        background: "#5B4FD6",
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#6B5FE6")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#5B4FD6")
                    }
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    View jobs
                </button>
            </div>
        </div>
    );
}
