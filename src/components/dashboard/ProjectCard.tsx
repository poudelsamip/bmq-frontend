import type { AllProjects } from "../../api/projects.api";

const ICONS = ["dns", "storage", "cloud", "hub", "memory", "router"];

interface StatBadgeProps {
    color: "green" | "red" | "blue";
    label: string;
}

function StatBadge({ color, label }: StatBadgeProps) {
    const palette: Record<string, { border: string; bg: string; dot: string; text: string }> = {
        green: {
            border: "rgba(74, 222, 128, 0.20)",
            bg: "rgba(74, 222, 128, 0.10)",
            dot: "#4ade80",
            text: "#86efac",
        },
        red: {
            border: "rgba(255, 180, 171, 0.30)",
            bg: "rgba(147, 0, 10, 0.20)",
            dot: "var(--color-error)",
            text: "var(--color-error)",
        },
        blue: {
            border: "rgba(183, 196, 255, 0.20)",
            bg: "rgba(183, 196, 255, 0.10)",
            dot: "var(--color-primary)",
            text: "var(--color-primary)",
        },
    };
    const p = palette[color];
    return (
        <div
            className="flex items-center gap-1.5 rounded-full"
            style={{
                border: `1px solid ${p.border}`,
                backgroundColor: p.bg,
                padding: "4px 10px",
            }}
        >
            <div
                className="rounded-full shrink-0"
                style={{ width: 6, height: 6, backgroundColor: p.dot }}
            />
            <span
                className="uppercase font-semibold tracking-wide"
                style={{ fontSize: 11, color: p.text }}
            >
                {label}
            </span>
        </div>
    );
}

export interface ProjectCardProps {
    project: AllProjects;
    onNavigate?: (id: string) => void;
    onMenuClick?: (id: string) => void;
}

export default function ProjectCard({ project, onNavigate, onMenuClick }: ProjectCardProps) {
    const iconName = ICONS[Math.abs(project.id.charCodeAt(0) + project.id.charCodeAt(1 % project.id.length)) % ICONS.length];

    return (
        <article
            id={`project-card-${project.id}`}
            onClick={() => onNavigate?.(project.id)}
            className="flex flex-col overflow-hidden rounded-lg transition-all duration-200 group cursor-pointer"
            style={{
                backgroundColor: "var(--color-surface-container-low)",
                border: "1px solid var(--color-outline-variant)",
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(183, 196, 255, 0.50)";
                el.style.backgroundColor = "var(--color-surface-container)";
                el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-outline-variant)";
                el.style.backgroundColor = "var(--color-surface-container-low)";
                el.style.boxShadow = "";
            }}
        >
            {/* Card body */}
            <div className="p-6 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                            backgroundColor: "var(--color-primary-container)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: 20,
                                color: "var(--color-on-primary-container)",
                            }}
                        >
                            {iconName}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onMenuClick?.(project.id);
                        }}
                        className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
                        style={{ color: "var(--color-on-surface-variant)" }}
                        aria-label="More options"
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "var(--color-on-surface)")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)")
                        }
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                            more_vert
                        </span>
                    </button>
                </div>

                {/* Name */}
                <h3
                    className="mb-1"
                    style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                    }}
                >
                    {project.name}
                </h3>

                {/* Redis URL */}
                <p
                    className="mb-5"
                    style={{
                        fontSize: 12,
                        fontFamily: "monospace",
                        color: "var(--color-on-surface-variant)",
                        opacity: 0.8,
                    }}
                >
                    {"redis://localhost:6379"}
                </p>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                    <StatBadge color="green" label="Completed" />
                    <StatBadge color="red" label="0 Failed" />
                </div>
            </div>

            {/* Footer strip */}
            <div
                className="px-6 py-4 flex items-center justify-between transition-colors duration-200"
                style={{
                    borderTop: "1px solid var(--color-outline-variant)",
                    backgroundColor: "rgba(42, 41, 51, 0.50)",
                }}
            >
                <span
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "var(--color-on-surface-variant)",
                    }}
                >
                    Last active{" "}
                    {project.lastActive
                        ? new Date(project.lastActive).toLocaleDateString()
                        : "N/A"}
                </span>
                <span
                    className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1"
                    style={{ fontSize: 18, color: "var(--color-primary)" }}
                >
                    arrow_forward
                </span>
            </div>
        </article>
    );
}
