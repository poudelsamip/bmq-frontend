import { useState } from "react";
import { Search, RefreshCw, Trash2, Droplets, Crown, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { queueApi, type RetryJobsSummary } from "../../api/queue.api";
import ConfirmModal from "../ui/ConfirmModal";
import { useAuth } from "../../context/AuthContext";
import { PLANS } from "../../constants/plans";

type BulkAction = "retry-all" | "clean-completed" | "clean-failed" | "drain";

interface ActionResult {
    label: string;
    message: string;
    isError: boolean;
}

export default function JobsHeader() {
    const { id, queueName } = useParams();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        setShowUpgrade(false);
        navigate("/dashboard/billing");
    };

    const isPro = user?.plan === PLANS.pro;

    const [busy, setBusy] = useState<BulkAction | null>(null);
    const [result, setResult] = useState<ActionResult | null>(null);
    const [confirmAction, setConfirmAction] = useState<BulkAction | null>(null);
    const [showUpgrade, setShowUpgrade] = useState(false);

    const invalidateJobs = () =>
        queryClient.invalidateQueries({ queryKey: ["jobs", id, queueName] });

    const showResult = (label: string, message: string, isError = false) => {
        setResult({ label, message, isError });
        setTimeout(() => setResult(null), 4000);
    };

    const handleRetryAll = async () => {
        if (!id || !queueName || busy) return;
        setBusy("retry-all");
        try {
            const res = await queueApi.retryAllFailed(id, queueName);
            const summary = res.data as RetryJobsSummary;
            await invalidateJobs();
            showResult(
                "Retry All",
                `${summary.retried} retried, ${summary.failed} failed.`,
            );
        } catch {
            showResult("Retry All", "Failed to retry jobs.", true);
        } finally {
            setBusy(null);
        }
    };

    const handleCleanCompleted = async () => {
        if (!id || !queueName || busy) return;
        setBusy("clean-completed");
        try {
            const res = await queueApi.cleanCompleted(id, queueName);
            await invalidateJobs();
            showResult("Clean Completed", `${res.data?.removed ?? 0} job(s) removed.`);
        } catch {
            showResult("Clean Completed", "Failed to clean completed jobs.", true);
        } finally {
            setBusy(null);
        }
    };

    const handleCleanFailed = async () => {
        if (!id || !queueName || busy) return;
        setBusy("clean-failed");
        try {
            const res = await queueApi.cleanFailed(id, queueName);
            await invalidateJobs();
            showResult("Clean Failed", `${res.data?.removed ?? 0} job(s) removed.`);
        } catch {
            showResult("Clean Failed", "Failed to clean failed jobs.", true);
        } finally {
            setBusy(null);
        }
    };

    const handleDrain = async () => {
        if (!id || !queueName || busy) return;
        setBusy("drain");
        try {
            await queueApi.drainQueue(id, queueName);
            await invalidateJobs();
            showResult("Drain", "Queue drained. Waiting jobs removed.");
        } catch {
            showResult("Drain", "Failed to drain queue.", true);
        } finally {
            setBusy(null);
        }
    };

    // Gate: free-plan users get the upgrade popup instead of the confirm modal
    const requestAction = (key: BulkAction) => {
        if (!isPro) {
            setShowUpgrade(true);
            return;
        }
        setConfirmAction(key);
    };

    const actions: {
        key: BulkAction;
        label: string;
        busyLabel: string;
        icon: React.ReactNode;
        style: React.CSSProperties;
    }[] = [
        {
            key: "retry-all",
            label: "Retry All Failed",
            busyLabel: "Retrying…",
            icon: <RefreshCw size={13} />,
            style: {
                border: "1px solid rgba(96,165,250,0.4)",
                color: "#60a5fa",
                background: "rgba(96,165,250,0.07)",
            },
        },
        {
            key: "clean-completed",
            label: "Clean Completed",
            busyLabel: "Cleaning…",
            icon: <Trash2 size={13} />,
            style: {
                border: "1px solid rgba(34,197,94,0.4)",
                color: "#22c55e",
                background: "rgba(34,197,94,0.07)",
            },
        },
        {
            key: "clean-failed",
            label: "Clean Failed",
            busyLabel: "Cleaning…",
            icon: <Trash2 size={13} />,
            style: {
                border: "1px solid rgba(239,68,68,0.4)",
                color: "var(--color-error)",
                background: "rgba(239,68,68,0.07)",
            },
        },
        {
            key: "drain",
            label: "Drain Queue",
            busyLabel: "Draining…",
            icon: <Droplets size={13} />,
            style: {
                border: "1px solid var(--color-outline)",
                color: "var(--color-on-surface-variant)",
                background: "transparent",
            },
        },
    ];

    const getModalConfig = () => {
        switch (confirmAction) {
            case "retry-all":
                return {
                    title: "Retry All Failed Jobs",
                    message: "Are you sure you want to retry all failed jobs? This may cause a sudden spike in queue activity.",
                    isDestructive: false,
                    confirmText: "Retry All",
                    onConfirm: () => { setConfirmAction(null); handleRetryAll(); }
                };
            case "clean-completed":
                return {
                    title: "Clean Completed Jobs",
                    message: "Are you sure you want to permanently remove all completed jobs from this queue?",
                    isDestructive: true,
                    confirmText: "Clean Completed",
                    onConfirm: () => { setConfirmAction(null); handleCleanCompleted(); }
                };
            case "clean-failed":
                return {
                    title: "Clean Failed Jobs",
                    message: "Are you sure you want to permanently remove all failed jobs from this queue?",
                    isDestructive: true,
                    confirmText: "Clean Failed",
                    onConfirm: () => { setConfirmAction(null); handleCleanFailed(); }
                };
            case "drain":
                return {
                    title: "Drain Queue",
                    message: "Are you sure you want to drain the queue? This will permanently remove all waiting jobs.",
                    isDestructive: true,
                    confirmText: "Drain Queue",
                    onConfirm: () => { setConfirmAction(null); handleDrain(); }
                };
            default:
                return null;
        }
    };

    const modalConfig = getModalConfig();

    return (
        <div className="mb-4 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                {/* Search */}
                <div className="relative w-full max-w-md">
                    <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        <Search size={16} />
                    </span>
                    <input
                        placeholder="Search jobs by ID or name..."
                        className="w-full pl-9 pr-3 py-2 rounded text-sm focus:outline-none"
                        style={{
                            background: "var(--color-surface-container)",
                            border: "1px solid var(--color-outline-variant)",
                            color: "var(--color-on-surface)",
                        }}
                        onFocus={(e) =>
                            (e.currentTarget.style.borderColor =
                                "var(--color-primary)")
                        }
                        onBlur={(e) =>
                            (e.currentTarget.style.borderColor =
                                "var(--color-outline-variant)")
                        }
                    />
                </div>

                {/* Bulk action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                    {actions.map((action) => {
                        const isThisBusy = busy === action.key;
                        const anyBusy = busy !== null;
                        return (
                            <button
                                key={action.key}
                                onClick={() => requestAction(action.key)}
                                disabled={anyBusy}
                                className="relative flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-opacity"
                                style={{
                                    ...action.style,
                                    opacity: anyBusy && !isThisBusy ? 0.45 : 1,
                                    cursor: anyBusy ? "default" : "pointer",
                                }}
                            >
                                {isThisBusy ? (
                                    <span className="inline-block animate-spin" style={{ fontSize: 12 }}>
                                        ↻
                                    </span>
                                ) : (
                                    action.icon
                                )}
                                {isThisBusy ? action.busyLabel : action.label}

                                {!isPro && (
                                    <span
                                        className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full"
                                        style={{
                                            background: "#facc15",
                                            border: "1px solid var(--color-surface-container)",
                                        }}
                                        title="Pro feature"
                                    >
                                        <Crown size={9} color="#1a1a1a" />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Inline result feedback */}
            {result && (
                <div
                    className="text-xs px-3 py-2 rounded flex items-center gap-2"
                    style={{
                        background: result.isError
                            ? "rgba(239,68,68,0.1)"
                            : "rgba(34,197,94,0.1)",
                        border: `1px solid ${result.isError ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
                        color: result.isError
                            ? "var(--color-error)"
                            : "#22c55e",
                    }}
                >
                    <span className="font-semibold">{result.label}:</span>
                    {result.message}
                </div>
            )}

            <ConfirmModal
                isOpen={!!confirmAction}
                title={modalConfig?.title || ""}
                message={modalConfig?.message || ""}
                isDestructive={modalConfig?.isDestructive}
                confirmText={modalConfig?.confirmText}
                onConfirm={modalConfig?.onConfirm || (() => {})}
                onCancel={() => setConfirmAction(null)}
                isBusy={busy !== null}
            />

            {/* Upgrade to Pro popup */}
            {showUpgrade && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                    onClick={() => setShowUpgrade(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-lg p-5 relative"
                        style={{
                            background: "var(--color-surface-container)",
                            border: "1px solid var(--color-outline-variant)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowUpgrade(false)}
                            className="absolute top-3 right-3"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <X size={16} />
                        </button>

                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                            style={{
                                background: "rgba(250,204,21,0.15)",
                                border: "1px solid rgba(250,204,21,0.35)",
                            }}
                        >
                            <Crown size={18} color="#facc15" />
                        </div>

                        <h3
                            className="text-sm font-semibold mb-1"
                            style={{ color: "var(--color-on-surface)" }}
                        >
                            Pro feature
                        </h3>
                        <p
                            className="text-xs mb-4"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Bulk queue actions (retry, clean, drain) are only available on the Pro plan. Upgrade to manage jobs in bulk and unlock more queue tools.
                        </p>

                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setShowUpgrade(false)}
                                className="px-3 py-2 rounded text-xs font-medium"
                                style={{
                                    color: "var(--color-on-surface-variant)",
                                    background: "transparent",
                                }}
                            >
                                Not now
                            </button>
                            <button
                                onClick={handleUpgradeClick}
                                className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold"
                                style={{
                                    background: "#facc15",
                                    color: "#1a1a1a",
                                }}
                            >
                                <Crown size={13} />
                                Upgrade to Pro
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}