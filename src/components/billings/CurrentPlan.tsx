export default function CurrentPlan() {
    return (
        <section
            className="flex flex-col md:flex-row justify-between md:items-end gap-6 rounded-xl"
            style={{
                backgroundColor: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                padding: "32px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
        >
            {/* Left: plan info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                    className="uppercase tracking-widest"
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--color-on-surface-variant)",
                    }}
                >
                    Current Plan
                </span>
                <h3
                    style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: "32px",
                        letterSpacing: "-0.01em",
                        color: "var(--color-on-surface)",
                        margin: 0,
                    }}
                >
                    Free Tier
                </h3>
                <p
                    style={{
                        fontSize: 14,
                        color: "var(--color-on-surface-variant)",
                        margin: 0,
                    }}
                >
                    Your current billing cycle ends on Oct 12, 2023.
                </p>
            </div>

            {/* Center: usage bar */}
            <div
                className="flex-1 w-full"
                style={{ maxWidth: 448, display: "flex", flexDirection: "column", gap: 8 }}
            >
                <div className="flex justify-between" style={{ fontSize: 13, fontWeight: 600 }}>
                    <span style={{ color: "var(--color-on-surface)" }}>Projects: 2 / 5</span>
                    <span style={{ color: "var(--color-on-surface-variant)" }}>40% used</span>
                </div>
                <div
                    className="w-full overflow-hidden rounded-full"
                    style={{
                        height: 8,
                        backgroundColor: "var(--color-surface-container-highest)",
                    }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: "40%",
                            backgroundColor: "var(--color-primary-container)",
                        }}
                    />
                </div>
            </div>

            {/* Right: manage plan button */}
            <button
                className="rounded-xl transition-colors"
                style={{
                    border: "1px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    padding: "8px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    backgroundColor: "transparent",
                    whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(183, 196, 255, 0.10)")
                }
                onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                }
            >
                Manage Plan
            </button>
        </section>
    );
}
