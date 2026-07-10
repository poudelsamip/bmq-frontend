import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queueApi, type JobDetails } from "../../api/queue.api";
import { X } from "lucide-react";
import { getStateBadgeStyle } from "../ui/StatusBadge";

export default function JobDrawer({
    jobId,
    onClose,
}: {
    jobId: string | null;
    onClose: () => void;
}) {
    const { id, queueName } = useParams();

    const {
        data: job,
        isLoading,
        isError,
    } = useQuery<JobDetails>({
        queryKey: ["jobDetails", id, queueName, jobId],
        queryFn: async () => {
            const res = await queueApi.getJobDetails(id!, queueName!, jobId!);
            return res.data;
        },
        enabled: !!id && !!queueName && !!jobId,
    });

    const queryClient = useQueryClient();
    const [retrying, setRetrying] = useState(false);
    const [removing, setRemoving] = useState(false);

    const invalidate = async () => {
        await Promise.all([
            queryClient.invalidateQueries({
                queryKey: ["jobDetails", id, queueName, jobId],
            }),
            queryClient.invalidateQueries({ queryKey: ["jobs", id, queueName] }),
        ]);
    };

    const retryHandler = async () => {
        if (!id || !queueName || !jobId) return;
        setRetrying(true);
        try {
            await queueApi.retryJob(id, queueName, jobId);
            await invalidate();
        } catch (error) {
            console.error(error);
        } finally {
            setRetrying(false);
        }
    };

    const removeHandler = async () => {
        if (!id || !queueName || !jobId) return;
        setRemoving(true);
        try {
            await queueApi.removeJob(id, queueName, jobId);
            // Refresh the job list then close the drawer since the job is gone
            await queryClient.invalidateQueries({
                queryKey: ["jobs", id, queueName],
            });
            onClose();
        } catch (error) {
            console.error(error);
            setRemoving(false);
        }
    };

    const handleFlowTreeClick = async () => {};

    if (!jobId) return null;

    return (
        <aside
            className="fixed top-0 right-0 h-full w-100 flex flex-col z-50"
            style={{
                background: "var(--color-surface-container-low)",
                borderLeft: "1px solid var(--color-outline-variant)",
            }}
        >
            {/* HEADER */}
            <div
                className="px-5 py-4 flex justify-between items-start"
                style={{
                    borderBottom: "1px solid var(--color-outline-variant)",
                }}
            >
                <div>
                    <h2
                        className="text-base font-semibold"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        {job?.name || "Loading..."}
                    </h2>
                    <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        ID: {job?.id}
                    </p>

                    {job && (
                        <span
                            className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded"
                            style={getStateBadgeStyle(job.state)}
                        >
                            ● {job.state.toUpperCase()}
                        </span>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="transition-colors"
                    style={{ color: "var(--color-on-surface-variant)" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                            "var(--color-on-surface)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                            "var(--color-on-surface-variant)")
                    }
                >
                    <X size={22} className="cursor-pointer" />
                </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-sm">
                {isLoading && (
                    <p style={{ color: "var(--color-on-surface-variant)" }}>
                        Loading…
                    </p>
                )}
                {isError && (
                    <p style={{ color: "var(--color-error)" }}>
                        Error loading job.
                    </p>
                )}

                {job && (
                    <>
                        {/* META GRID */}
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p
                                    className="text-xs mb-1"
                                    style={{
                                        color: "var(--color-on-surface-variant)",
                                    }}
                                >
                                    Queue
                                </p>
                                <p style={{ color: "var(--color-on-surface)" }}>
                                    {job.queueName}
                                </p>
                            </div>

                            <div>
                                <p
                                    className="text-xs mb-1"
                                    style={{
                                        color: "var(--color-on-surface-variant)",
                                    }}
                                >
                                    Attempts
                                </p>
                                <p style={{ color: "var(--color-on-surface)" }}>
                                    {job.attempts.made} / {job.attempts.max}
                                </p>
                            </div>

                            <div>
                                <p
                                    className="text-xs mb-1"
                                    style={{
                                        color: "var(--color-on-surface-variant)",
                                    }}
                                >
                                    Duration
                                </p>
                                <p style={{ color: "var(--color-on-surface)" }}>
                                    {job.timing.duration}
                                </p>
                            </div>

                            <div>
                                <p
                                    className="text-xs mb-1"
                                    style={{
                                        color: "var(--color-on-surface-variant)",
                                    }}
                                >
                                    Created
                                </p>
                                <p style={{ color: "var(--color-on-surface)" }}>
                                    {job.timing.createdAt}
                                </p>
                            </div>
                        </div>

                        {/* ERROR */}
                        {job.error?.message && (
                            <Section title="Error">
                                <div
                                    className="p-3 font-mono text-xs rounded"
                                    style={{
                                        background:
                                            "var(--color-error-container)",
                                        borderLeft:
                                            "3px solid var(--color-error)",
                                        color: "var(--color-on-error-container)",
                                    }}
                                >
                                    {job.error.message}
                                </div>
                            </Section>
                        )}

                        {/* PAYLOAD */}
                        <Section title="Payload">
                            <pre
                                className="rounded p-4 overflow-x-auto text-xs tracking-wide leading-relaxed"
                                style={{
                                    background:
                                        "var(--color-surface-container-lowest)",
                                    border: "1px solid var(--color-outline-variant)",
                                    fontFamily: "JetBrains Mono, monospace",
                                }}
                            >
                                <code
                                    className="font-mono"
                                    style={{ color: "var(--color-on-surface)" }}
                                    dangerouslySetInnerHTML={{
                                        __html: JSON.stringify(
                                            job.payload,
                                            null,
                                            2,
                                        )
                                            // keys
                                            .replace(/(".*?"):/g, `"§$1§":`)
                                            .replace(
                                                /"§(.*?)§":/g,
                                                `<span style="color:var(--color-primary)">"$1"</span>:`,
                                            )
                                            // strings
                                            .replace(
                                                /: "(.*?)"/g,
                                                `: <span style="color:#86efac">\\"$1\\"</span>`,
                                            )
                                            // numbers / booleans / null
                                            .replace(
                                                /: (\d+|true|false|null)/g,
                                                `: <span style="color:#fcd34d">$1</span>`,
                                            ),
                                    }}
                                />
                            </pre>
                        </Section>

                        {/* LOGS */}
                        <Section title="Runtime Logs">
                            <div
                                className="rounded overflow-hidden font-mono text-xs"
                                style={{
                                    border: "1px solid var(--color-outline-variant)",
                                }}
                            >
                                {job.logs.map((log, i) => {
                                    const [time, ...rest] = log.split(" ");
                                    return (
                                        <div
                                            key={i}
                                            className="flex gap-3 px-3 py-2"
                                            style={{
                                                borderBottom:
                                                    i < job.logs.length - 1
                                                        ? "1px solid var(--color-outline-variant)"
                                                        : "none",
                                            }}
                                        >
                                            <span
                                                className="w-20 shrink-0"
                                                style={{
                                                    color: "var(--color-on-surface-variant)",
                                                }}
                                            >
                                                {time?.replace(/[\[\]]/g, "")}
                                            </span>
                                            <span
                                                className="break-all"
                                                style={{
                                                    color: "var(--color-on-surface)",
                                                }}
                                            >
                                                {rest.join(" ")}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Section>
                    </>
                )}
            </div>

            {/* FOOTER */}
            <div
                className="px-5 py-3 flex gap-3"
                style={{ borderTop: "1px solid var(--color-outline-variant)" }}
            >
                {/* Retry button — only active for failed jobs */}
                <button
                    className="flex-1 py-2 rounded text-sm font-medium transition-opacity"
                    style={
                        job?.state?.toLowerCase() === "failed" && !retrying
                            ? {
                                  border: "1px solid var(--color-error)",
                                  color: "var(--color-error)",
                                  cursor: "pointer",
                                  opacity: 1,
                              }
                            : {
                                  border: "1px solid var(--color-outline-variant)",
                                  color: "var(--color-on-surface-variant)",
                                  cursor: "not-allowed",
                                  opacity: 0.45,
                              }
                    }
                    onClick={retryHandler}
                    disabled={job?.state?.toLowerCase() !== "failed" || retrying}
                >
                    {retrying ? "Retrying…" : "Retry"}
                </button>

                {/* Remove button — always available */}
                <button
                    className="flex-1 py-2 rounded text-sm font-medium transition-opacity"
                    style={
                        !removing
                            ? {
                                  border: "1px solid var(--color-outline-variant)",
                                  color: "var(--color-on-surface-variant)",
                                  cursor: "pointer",
                                  opacity: 1,
                              }
                            : {
                                  border: "1px solid var(--color-outline-variant)",
                                  color: "var(--color-on-surface-variant)",
                                  cursor: "not-allowed",
                                  opacity: 0.45,
                              }
                    }
                    onClick={removeHandler}
                    disabled={removing}
                    onMouseEnter={(e) => {
                        if (!removing)
                            e.currentTarget.style.borderColor =
                                "var(--color-error)";
                        if (!removing)
                            e.currentTarget.style.color = "var(--color-error)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                            "var(--color-outline-variant)";
                        e.currentTarget.style.color =
                            "var(--color-on-surface-variant)";
                    }}
                >
                    {removing ? "Removing…" : "Remove"}
                </button>

                <button
                    className="flex-1 py-2 rounded text-sm font-medium transition-opacity hover:opacity-80"
                    style={{
                        background: "var(--color-primary-container)",
                        color: "white",
                    }}
                    onClick={handleFlowTreeClick}
                >
                    Flow Tree
                </button>
            </div>
        </aside>
    );
}

/* SMALL HELPER */
function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <h3
                className="text-[11px] font-semibold uppercase mb-2 tracking-widest"
                style={{ color: "var(--color-on-surface-variant)" }}
            >
                {title}
            </h3>
            {children}
        </section>
    );
}
