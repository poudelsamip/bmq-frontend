import type { JobStatus } from "../../api/queue.api";

export function getStateBadgeStyle(state: string): React.CSSProperties {
    switch (state?.toLowerCase()) {
        case "completed":
            return { border: "1px solid rgba(34, 197, 94, 0.3)", backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" };
        case "failed":
            return { border: "1px solid rgba(239, 68, 68, 0.3)", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "var(--color-error)" };
        case "active":
            return { border: "1px solid rgba(96, 165, 250, 0.3)", backgroundColor: "rgba(96, 165, 250, 0.1)", color: "#60a5fa" };
        case "delayed":
        case "waiting":
        case "waiting-children":
            return { border: "1px solid rgba(250, 204, 21, 0.3)", backgroundColor: "rgba(250, 204, 21, 0.1)", color: "#facc15" };
        case "paused":
            return { border: "1px solid rgba(167, 139, 250, 0.3)", backgroundColor: "rgba(167, 139, 250, 0.1)", color: "#a78bfa" };
        default:
            return { border: "1px solid var(--color-outline-variant)", backgroundColor: "transparent", color: "var(--color-on-surface-variant)" };
    }
}

export default function StatusBadge({ status }: { status: JobStatus }) {
    return (
        <span
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded font-mono font-medium"
            style={getStateBadgeStyle(status)}
        >
            ● {status.toUpperCase()}
        </span>
    );
}
