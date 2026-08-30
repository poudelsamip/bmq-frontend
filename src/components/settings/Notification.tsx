import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { settingsApi } from "../../api/auth.api";
import { Link } from 'react-router-dom';
import { PLANS } from "../../constants/plans";

const Crown = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="inline-block"
    >
        <path d="M2 19l2-9 5 4 3-7 3 7 5-4 2 9H2zm2.8-2h14.4l-1.2-5.4-3.8 3-3.2-7.5-3.2 7.5-3.8-3L4.8 17z" />
    </svg>
);

export default function Notification() {
    const { user } = useAuth();
    const isPro = user?.plan === PLANS.pro;

    const [toggles, setToggles] = useState({
        failureAlerts: false,
        weeklyDigest: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (!isPro) {
            setIsLoading(false);
            return;
        }
        
        settingsApi.getNotifications()
            .then(res => {
                setToggles({
                    failureAlerts: res.data.preferences.failureAlerts,
                    weeklyDigest: res.data.preferences.weeklyDigest,
                });
            })
            .catch(() => {
                // ignore
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isPro]);

    const handleToggle = async (key: "failureAlerts" | "weeklyDigest") => {
        if (!isPro || saving || isLoading) return;
        const next = { ...toggles, [key]: !toggles[key] };
        setToggles(next);
        setSaving(true);
        setStatus("idle");
        try {
            await settingsApi.updateNotifications(next);
            setStatus("success");
            setMessage("Preferences saved.");
        } catch (err: unknown) {
            // revert
            setToggles(toggles);
            setStatus("error");
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data

                    ?.message ?? "Failed to save preferences.";
            setMessage(msg);
        } finally {
            setSaving(false);
        }
    };

    const items = [
        {
            key: "failureAlerts" as const,
            title: "Failure alerts",
            desc: "Receive an email whenever a job in your queues fails.",
        },
        {
            key: "weeklyDigest" as const,
            title: "Weekly digest",
            desc: "Get a weekly email summary of your infrastructure performance every Monday.",
        },
    ];

    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3
                    className="text-[20px] font-medium"
                    style={{ color: "var(--color-on-surface)", fontFamily: "Manrope, sans-serif" }}
                >
                    Notifications
                </h3>
                <p className="text-[14px]" style={{ color: "var(--color-on-surface-variant)" }}>
                    Manage which email notifications you receive from the system.
                </p>
            </div>

            <div
                className="rounded overflow-hidden"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {items.map((t, i) => {
                    const enabled = toggles[t.key];
                    return (
                        <div
                            key={t.key}
                            className="flex items-center justify-between px-6 py-5"
                            style={
                                i < items.length - 1
                                    ? { borderBottom: "1px solid var(--color-outline-variant)" }
                                    : {}
                            }
                        >
                            <div className="space-y-1 flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2">
                                    <p
                                        className="text-[14px] font-medium"
                                        style={{ color: "var(--color-on-surface)" }}
                                    >
                                        {t.title}
                                    </p>
                                    {/* Pro badge */}
                                    <span
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                                        style={{
                                            background: isPro
                                                ? "rgba(168,85,247,0.15)"
                                                : "rgba(168,85,247,0.08)",
                                            color: isPro ? "rgb(192,132,252)" : "rgb(168,85,247)",
                                            border: "1px solid rgba(168,85,247,0.3)",
                                        }}
                                    >
                                        <Crown />
                                        Pro
                                    </span>
                                </div>
                                <p
                                    className="text-[14px]"
                                    style={{ color: "var(--color-on-surface-variant)" }}
                                >
                                    {t.desc}
                                </p>
                            </div>

                            <div className="shrink-0 flex flex-col items-end gap-1">
                                {/* Toggle */}
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={enabled}
                                    disabled={!isPro || saving || isLoading}
                                    onClick={() => handleToggle(t.key)}
                                    className="relative w-10 h-5 rounded-full transition-all focus:outline-none"
                                    style={{
                                        background: enabled
                                            ? "var(--color-primary)"
                                            : "var(--color-outline-variant)",
                                        opacity: (!isPro || isLoading) ? 0.45 : 1,
                                        cursor: (!isPro || isLoading) ? "not-allowed" : "pointer",
                                    }}
                                    title={!isPro ? "Upgrade to Pro to enable notifications" : undefined}
                                >
                                    <div
                                        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                                            enabled ? "right-0.5" : "left-0.5"
                                        }`}
                                        style={{ background: "var(--color-surface-container-lowest)" }}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Upgrade CTA for free users */}
            {!isPro && (
                <div
                    className="rounded px-5 py-4 flex items-center gap-3"
                    style={{
                        background: "rgba(168,85,247,0.08)",
                        border: "1px solid rgba(168,85,247,0.25)",
                    }}
                >
                    <Crown />
                    <div className="flex-1 min-w-0">
                        <p
                            className="text-[13px] font-semibold"
                            style={{ color: "rgb(192,132,252)" }}
                        >
                            Upgrade to Pro to unlock email notifications
                        </p>
                        <p
                            className="text-[12px]"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Failure alert emails and weekly digest emails are available on the Pro plan.
                        </p>
                    </div>
                    <Link
                        to="/dashboard/billing"
                        className="px-4 py-1.5 text-[13px] font-semibold rounded-full transition-opacity hover:opacity-80 whitespace-nowrap"
                        style={{
                            background: "rgba(168,85,247,0.8)",
                            color: "white",
                        }}
                    >
                        Upgrade
                    </Link>
                </div>
            )}

            {/* Status toast */}
            {status !== "idle" && (
                <p
                    className="text-[13px] px-3 py-2 rounded"
                    style={{
                        background:
                            status === "success"
                                ? "rgba(34,197,94,0.12)"
                                : "rgba(239,68,68,0.12)",
                        color:
                            status === "success"
                                ? "rgb(74,222,128)"
                                : "rgb(248,113,113)",
                        border: `1px solid ${status === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                    }}
                >
                    {message}
                </p>
            )}
        </section>
    );
}
