import type { JobStatus } from "../../api/queue.api";

const getStyles = (status: JobStatus) => {
    switch (status) {
        case "active":
            return {
                container: "bg-blue-50 text-blue-700",
                dot: "bg-blue-600 animate-pulse",
            };
        case "completed":
            return {
                container: "bg-gray-200 text-gray-700",
                dot: "bg-gray-500",
            };
        case "failed":
            return {
                container: "bg-red-50 text-red-600",
                dot: "bg-red-600",
            };
        case "waiting":
            return {
                container: "bg-gray-100 text-gray-600",
                dot: "bg-gray-400",
            };
        case "delayed":
            return {
                container: "bg-orange-100 text-orange-700",
                dot: "bg-orange-600",
            };
        default:
            return {
                container: "bg-gray-100 text-gray-600",
                dot: "bg-gray-400",
            };
    }
};

export default function StatusBadge({ status }: { status: JobStatus }) {
    const styles = getStyles(status);

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${styles.container}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
