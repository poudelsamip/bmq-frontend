interface CreateProjectCardProps {
    onCreate?: () => void;
    disabled?: boolean;
    disabledMessage?: string;
}

export default function CreateProjectCard({ onCreate, disabled, disabledMessage }: CreateProjectCardProps) {
    return (
        <button
            onClick={disabled ? undefined : onCreate}
            id="create-project-card"
            className={`flex flex-col items-center justify-center gap-4 text-center transition-all duration-200 group rounded-sm ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
            style={{
                border: "2px dashed var(--color-outline-variant)",
                minHeight: 240,
                padding: "24px",
                backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
                if (disabled) return;
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-primary)";
                el.style.backgroundColor = "var(--color-surface-container-low)";
            }}
            onMouseLeave={(e) => {
                if (disabled) return;
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
                    style={{ fontSize: 22, color: disabled ? "var(--color-error)" : "var(--color-on-surface-variant)" }}
                >
                    {disabled ? "lock" : "add"}
                </span>
            </div>

            <div>
                <h3
                    className="mb-2"
                    style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 16,
                        fontWeight: 600,
                        color: disabled ? "var(--color-error)" : "var(--color-on-surface)",
                    }}
                >
                    {disabled ? "Upgrade to Pro" : "Create New Project"}
                </h3>
                <p
                    style={{
                        fontSize: 14,
                        color: disabled ? "var(--color-error)" : "var(--color-on-surface-variant)",
                        maxWidth: 200,
                        margin: "0 auto",
                        lineHeight: 1.5,
                        fontWeight: disabled ? 500 : 400
                    }}
                >
                    {disabled && disabledMessage ? disabledMessage : "Initialize a new infrastructure pulse monitor for your Redis cluster."}
                </p>
            </div>
        </button>
    );
}
