import type { Job } from "../../api/queue.api";
import StatusBadge from "../ui/StatusBadge";

export const JobRow = ({
    job,
    onJobClick,
}: {
    job: Job;
    onJobClick: (jobId: string) => void;
}) => {
    return (
        <tr
            className="h-12 transition-colors cursor-default"
            style={{
                borderTop: "1px solid var(--color-outline-variant)",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--color-surface-container)")
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

            <td className="px-4 py-3 text-right">
                <button
                    className="text-lg leading-none transition-colors"
                    style={{ color: "var(--color-on-surface-variant)" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-on-surface)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-on-surface-variant)")
                    }
                >
                    ⋮
                </button>
            </td>
        </tr>
    );
};
