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
            className="w-56 shrink-0 flex flex-col pt-4 pb-6"
            style={{
                background: "#f0f3ff",
                borderRight: "0.5px solid #c4c5da",
                minHeight: "100vh",
            }}
        >
            {/* Back link */}
            <button
                onClick={handleBack}
                className="flex items-center gap-1 px-4 mb-2 text-[12px] font-medium underline w-fit"
                style={{ color: "#0028c2" }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10 12L6 8l4-4"
                        stroke="#0028c2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                ALL PROJECTS
            </button>

            {/* Section label */}
            <p
                className="px-4 mb-2 text-[16px] font-medium uppercase"
                style={{ color: "#444657", letterSpacing: "0.08em" }}
            >
                {projectName}
            </p>

            {/* Queue list */}

            <div className="flex flex-col gap-1 px-2">
                {queues.map((q: string) => {
                    const isSelected = selectedQeueue === q;

                    return (
                        <button
                            key={q}
                            onClick={() => onQueueSelect(q)}
                            className={cn(
                                // Base Styles
                                "group w-full text-left px-3 py-2.5 flex items-center justify-between gap-2",
                                "rounded-sm border-[0.5px] transition-all duration-150",

                                // Selection Logic + Hover States
                                isSelected
                                    ? "bg-[#dce2f3] border-blue-500 hover:bg-[#d1d8ed]"
                                    : "bg-slate-200 border-transparent hover:bg-slate-200 hover:border-blue-400",
                            )}
                        >
                            <span
                                className={cn(
                                    "text-[16px] truncate font-inter",
                                    isSelected
                                        ? "text-[#0028c2]"
                                        : "text-[#151c27]",
                                )}
                            >
                                {q}
                            </span>

                            {/* The Dot Indicator */}
                            <span
                                className={cn(
                                    "w-2 h-2 rounded-full shrink-0 transition-colors duration-150",
                                    isSelected
                                        ? "bg-[#0028c2]"
                                        : "bg-[#c4c5da] group-hover:bg-slate-500",
                                )}
                            />
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
