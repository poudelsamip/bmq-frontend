import { useNavigate } from "react-router-dom";

interface ProjectSidebarProps {
    queues: string[];
    projectName: string;
    selectedQeueue: string | null;
    onQueueSelect: (queueName: string) => void;
}

function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ProjectSidebar({
    queues,
    projectName,
    selectedQeueue,
    onQueueSelect,
}: ProjectSidebarProps) {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/dashboard");
    };

    return (
        <aside
            className="w-64 shrink-0 flex flex-col pt-4 pb-6"
            style={{
                background: "var(--color-surface-container-lowest)",
                borderRight: "1px solid var(--color-outline-variant)",
                height: "100%",
            }}
        >
            <div className="flex w-full justify-between mb-5">

            
            {/* Back link */}
            <button
                onClick={handleBack}
                className="flex items-center text-[12px] font-medium underline w-fit"
                style={{ color: "var(--color-primary)" }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10 12L6 8l4-4"
                        stroke="var(--color-primary)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                ALL PROJECTS
            </button>

            <p
                className="text-[12px] font-bold uppercase mr-3"
                style={{
                    color: "var(--color-on-surface-variant)",
                    letterSpacing: "0.08em",
                }}
            >
                {projectName}
            </p>
            </div>

            {/* Queue list */}
            <div className="flex flex-col gap-1 px-2" style={{ overflowY: "auto", flex: 1 }}>
                {queues.map((q: string) => {
                    const isSelected = selectedQeueue === q;

                    return (
                        <button
                            key={q}
                            onClick={() => onQueueSelect(q)}
                            className={cn(
                                "group w-full text-left px-3 py-3 flex items-center justify-between gap-2",
                                "rounded-xs border transition-all duration-150",
                            )}
                            style={{
                                background: isSelected
                                    ? "rgba(183,196,255,0.2)"
                                    : "var(--color-surface-container)",
                                borderColor: isSelected
                                    ? "rgba(183,196,255,0.3)"
                                    : "transparent",
                            }}
                        >
                            <span
                                className="text-[16px] truncate font-inter"
                                style={{
                                    color: isSelected
                                        ? "var(--color-primary)"
                                        : "var(--color-on-surface)",
                                }}
                            >
                                {q}
                            </span>

                            {/* Dot indicator */}
                            <span
                                className="w-2 h-2 rounded-full shrink-0 transition-colors duration-150"
                                style={{
                                    background: isSelected
                                        ? "var(--color-primary)"
                                        : "var(--color-outline-variant)",
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
