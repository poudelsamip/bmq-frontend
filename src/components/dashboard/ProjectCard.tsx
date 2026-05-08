import { MoreVertical, Database, Server, ArrowRight } from "lucide-react";
import type { AllProjects } from "../../api/projects.api";

export interface ProjectStats {
    label: string;
    count: string;
    status: "completed" | "failed" | "waiting";
}

export interface ProjectCardProps {
    project: AllProjects;
    onNavigate?: (id: string) => void;
    onMenuClick?: (id: string) => void;
}

const cardIcons = [Database, Server];

export default function ProjectCard({
    project,
    onNavigate,
    onMenuClick,
}: ProjectCardProps) {
    const Icon =
        cardIcons[Math.abs(project.id.charCodeAt(0)) % cardIcons.length];
    const name = project.name;
    return (
        <article
            onClick={() => onNavigate?.(project.id)}
            className="flex flex-col overflow-hidden rounded transition-all duration-200 hover:shadow-md group"
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #c4c5da",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0038ff";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#c4c5da";
            }}
        >
            {/* Card body */}
            <div className="p-6 flex flex-col flex-1 gap-0">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#dee0ff" }}
                    >
                        <Icon
                            className="w-5 h-5"
                            style={{ color: "#0038ff" }}
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onMenuClick?.(project.id);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-md transition-colors hover:opacity-70"
                        style={{ color: "#444657" }}
                        aria-label="More options"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>

                {/* Name & URL */}
                <h3
                    className="text-[15px] font-semibold mb-1"
                    style={{ color: "#151c27" }}
                >
                    {name}
                </h3>

                {/* Queue Counts  */}
                <div className="flex flex-wrap gap-2 mb-2">
                    <p
                        className="text-[13px] font-medium"
                        style={{ color: "#444657" }}
                    >
                        10 jobs
                    </p>
                </div>
            </div>

            {/* Footer strip */}
            <div
                className="px-6 py-3 flex items-center justify-between"
                style={{
                    borderTop: "1px solid #c4c5da",
                    backgroundColor: "#f0f3ff",
                }}
            >
                <span
                    className="text-[11px] font-medium tracking-wide"
                    style={{ color: "#444657" }}
                >
                    Last active{" "}
                    {project.createdAt
                        ? new Date(project.lastActive).toDateString()
                        : "N/A"}
                </span>
                <button
                    className="flex items-center justify-center rounded-full transition-colors"
                    aria-label="Open project"
                    style={{ color: "#0038ff" }}
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </article>
    );
}
