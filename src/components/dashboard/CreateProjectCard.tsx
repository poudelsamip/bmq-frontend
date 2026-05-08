import { Plus } from "lucide-react";

interface CreateProjectCardProps {
    onCreate?: () => void;
}

export default function CreateProjectCard({
    onCreate,
}: CreateProjectCardProps) {
    return (
        <button
            onClick={onCreate}
            className="flex flex-col items-center justify-center gap-4 rounded min-h-60 text-center transition-all duration-200 group cursor-pointer"
            style={{
                border: "2px dashed #c4c5da",
                backgroundColor: "#f0f3ff",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0038ff";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#c4c5da";
            }}
        >
            <div
                className="w-12 h-12 rounded flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid #c4c5da" }}
            >
                <Plus className="w-5 h-5" style={{ color: "#444657" }} />
            </div>
            <div>
                <p
                    className="text-[15px] font-semibold mb-1"
                    style={{ color: "#151c27" }}
                >
                    Create New Project
                </p>
                <p
                    className="text-sm max-w-45 mx-auto leading-snug"
                    style={{ color: "#444657" }}
                >
                    Initialize a new project to monitor your BullMQ queues.
                </p>
            </div>
        </button>
    );
}
