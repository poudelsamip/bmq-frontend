import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { Job } from "../../api/queue.api";
import { queueApi } from "../../api/queue.api";
import StatusBadge from "../ui/StatusBadge";

export const JobRow = ({
    job,
    onJobClick,
}: {
    job: Job;
    onJobClick: (jobId: string) => void;
}) => {
    const { id, queueName } = useParams();
    const queryClient = useQueryClient();

    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState<"retry" | "remove" | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    const invalidateJobs = () =>
        queryClient.invalidateQueries({ queryKey: ["jobs", id, queueName] });

    const handleRetry = async () => {
        if (!id || !queueName || !job.id) return;
        setLoading("retry");
        setMenuOpen(false);
        try {
            await queueApi.retryJob(id, queueName, job.id);
            await invalidateJobs();
        } catch (err) {
            console.error("Retry failed:", err);
        } finally {
            setLoading(null);
        }
    };

    const handleRemove = async () => {
        if (!id || !queueName || !job.id) return;
        setLoading("remove");
        setMenuOpen(false);
        try {
            await queueApi.removeJob(id, queueName, job.id);
            await invalidateJobs();
        } catch (err) {
            console.error("Remove failed:", err);
        } finally {
            setLoading(null);
        }
    };

    const isBusy = loading !== null;

    return (
        <tr
            className="h-12 transition-colors cursor-default"
            style={{
                borderTop: "1px solid var(--color-outline-variant)",
                opacity: isBusy ? 0.6 : 1,
            }}
            onMouseEnter={(e) =>
                !isBusy && (e.currentTarget.style.background = "var(--color-surface-container)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
            }
        >
            <td
                className="px-4 py-3 text-sm font-mono"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {job.id}
            </td>

            <td
                className="px-4 py-3 text-sm font-medium cursor-pointer"
                style={{ color: "var(--color-primary)" }}
                onClick={() => onJobClick(job.id!)}
            >
                {job.name}
            </td>

            <td className="px-4 py-3">
                <StatusBadge status={job.state} />
            </td>

            <td
                className="px-4 py-3 text-sm text-center"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {job.attemptsMade}
            </td>

            <td
                className="px-4 py-3 text-sm"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {job.duration}
            </td>

            <td
                className="px-4 py-3 text-sm"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {job.processedOn}
            </td>

            {/* Actions cell */}
            <td className="px-4 py-3 text-right">
                <div className="relative inline-block" ref={menuRef}>
                    <button
                        className="text-lg leading-none transition-colors px-1"
                        style={{
                            color: isBusy
                                ? "var(--color-primary)"
                                : "var(--color-on-surface-variant)",
                            cursor: isBusy ? "default" : "pointer",
                        }}
                        onClick={() => !isBusy && setMenuOpen((v) => !v)}
                        title="Job actions"
                        onMouseEnter={(e) =>
                            !isBusy &&
                            (e.currentTarget.style.color =
                                "var(--color-on-surface)")
                        }
                        onMouseLeave={(e) =>
                            !isBusy &&
                            (e.currentTarget.style.color =
                                "var(--color-on-surface-variant)")
                        }
                    >
                        {isBusy ? "…" : "⋮"}
                    </button>

                    {menuOpen && (
                        <div
                            className="absolute right-0 z-50 rounded text-sm shadow-lg min-w-[130px]"
                            style={{
                                background:
                                    "var(--color-surface-container-high)",
                                border: "1px solid var(--color-outline-variant)",
                                top: "100%",
                                marginTop: 4,
                            }}
                        >
                            {/* Retry — only shown for failed jobs */}
                            {job.state === "failed" && (
                                <button
                                    className="w-full text-left px-4 py-2 transition-colors"
                                    style={{
                                        color: "var(--color-on-surface)",
                                        borderBottom:
                                            "1px solid var(--color-outline-variant)",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                            "var(--color-surface-container-highest)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                            "transparent")
                                    }
                                    onClick={handleRetry}
                                >
                                    ↩ Retry
                                </button>
                            )}

                            {/* Remove */}
                            <button
                                className="w-full text-left px-4 py-2 transition-colors"
                                style={{ color: "var(--color-error)" }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                        "var(--color-surface-container-highest)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                        "transparent")
                                }
                                onClick={handleRemove}
                            >
                                ✕ Remove
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};
