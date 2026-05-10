interface CreateProjectCardProps {
    onCreate?: () => void;
}

export default function CreateProjectCard({ onCreate }: CreateProjectCardProps) {
    return (
        <button
            onClick={onCreate}
            id="create-project-card"
            className="flex flex-col items-center justify-center gap-4 text-center transition-all duration-200 group cursor-pointer rounded-lg"
            style={{
                border: "2px dashed var(--color-outline-variant)",
                minHeight: 240,
                padding: "24px",
                backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-primary)";
                el.style.backgroundColor = "var(--color-surface-container-low)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-outline-variant)";
                el.style.backgroundColor = "transparent";
            }}
        >
            {/* Plus icon circle */}
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 22, color: "var(--color-on-surface-variant)" }}
                >
                    add
                </span>
            </div>

            <div>
                <h3
                    className="mb-2"
                    style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                    }}
                >
                    Create New Project
                </h3>
                <p
                    style={{
                        fontSize: 14,
                        color: "var(--color-on-surface-variant)",
                        maxWidth: 200,
                        margin: "0 auto",
                        lineHeight: 1.5,
                    }}
                >
                    Initialize a new infrastructure pulse monitor for your Redis cluster.
                </p>
            </div>
        </button>
    );
}
