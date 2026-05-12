import type { Job } from "../../api/queue.api";
import { JobRow } from "./TableRow";

export const JobsTable = ({
    jobs,
    onJobClick,
}: {
    jobs: Job[];
    onJobClick: (jobId: string) => void;
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
            </div>
        </div>
    );
};
