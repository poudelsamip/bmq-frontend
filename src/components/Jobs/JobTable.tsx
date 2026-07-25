import { Lock } from "lucide-react";
import type { Job } from "../../api/queue.api";
import { JobRow } from "./TableRow";

export const JobsTable = ({
    jobs,
    onJobClick,
    isFreeTier = false,
}: {
    jobs: Job[];
    onJobClick: (jobId: string) => void;
    isFreeTier?: boolean;
}) => {
    return (
        <div
            className="rounded overflow-hidden"
            style={{ border: "1px solid var(--color-outline-variant)" }}
        >
            {/* scroll container */}
            <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                <table className="w-full text-left text-sm">
                    <thead
                        className="sticky top-0 z-10"
                        style={{
                            background: "var(--color-surface-container-high)",
                            borderBottom: "1px solid var(--color-outline-variant)",
                        }}
                    >
                        <tr
                            className="text-xs uppercase tracking-wider"
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <th className="px-4 py-3 font-medium">Job ID</th>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium text-center">Attempts</th>
                            <th className="px-4 py-3 font-medium">Duration</th>
                            <th className="px-4 py-3 font-medium">Processed On</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job) => (
                            <JobRow
                                key={job.id}
                                job={job}
                                onJobClick={onJobClick}
                            />
                        ))}
                    </tbody>
                </table>

                {/* Free-tier limit banner — pinned after the last row */}
                {isFreeTier && (
                    <div
                        className="flex items-center justify-between gap-3 px-4 py-3"
                        style={{
                            background: "var(--color-surface-container-high)",
                            borderTop: "1px solid var(--color-outline-variant)",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Lock
                                size={14}
                                style={{ color: "var(--color-primary)", flexShrink: 0 }}
                            />
                            <span
                                className="text-xs"
                                style={{ color: "var(--color-on-surface-variant)" }}
                            >
                                <span style={{ color: "var(--color-on-surface)" }} className="font-medium">
                                    Free plan:
                                </span>{" "}
                                only the last&nbsp;
                                <span style={{ color: "var(--color-primary)" }} className="font-semibold">
                                    30 jobs
                                </span>{" "}
                                per queue are visible. Upgrade to Pro for unlimited history.
                            </span>
                        </div>
                        <a
                            href="/dashboard/billing"
                            className="text-xs font-semibold whitespace-nowrap px-3 py-1 rounded transition-opacity hover:opacity-80"
                            style={{
                                background: "var(--color-primary)",
                                color: "var(--color-on-primary)",
                            }}
                        >
                            Upgrade
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

