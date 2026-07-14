export default function InfraGraph() {
    return (
        <section style={{ marginTop: 80 }}>
            {/* Section heading with rule */}
            <div
                className="flex items-center gap-3"
                style={{ marginBottom: 32 }}
            >
                <span
                    className="uppercase tracking-widest whitespace-nowrap"
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--color-on-surface-variant)",
                    }}
                >
                    Global Infrastructure Graph
                </span>
                <div
                    className="flex-1"
                    style={{
                        height: 1,
                        backgroundColor: "var(--color-outline-variant)",
                    }}
                />
            </div>

            {/* Graph container */}
            <div
                className="relative flex justify-center overflow-hidden rounded-sm"
                style={{
                    padding: "48px",
                    backgroundColor: "var(--color-surface-container-low)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {/* Atmospheric hub icon background */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{ opacity: 0.08 }}
                    aria-hidden="true"
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 400, color: "var(--color-primary)" }}
                    >
                        hub
                    </span>
                </div>

                {/* Tree graph */}
                <div
                    className="relative flex flex-col items-center"
                    style={{ zIndex: 10 }}
                >
                    {/* Hub node */}
                    <div
                        className="px-4 py-2 rounded-sm font-medium"
                        style={{
                            border: "1px solid var(--color-outline)",
                            backgroundColor:
                                "var(--color-surface-container-high)",
                            color: "var(--color-on-surface)",
                            fontSize: 13,
                            fontWeight: 500,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        }}
                    >
                        Bull Console Central Hub
                    </div>

                    {/* Vertical stem */}
                    <div
                        style={{
                            width: 1,
                            height: 32,
                            backgroundColor: "var(--color-outline)",
                        }}
                    />

                    {/* Children row */}
                    <div className="flex items-start">
                        {/* Left branch */}
                        <div className="flex flex-col items-center">
                            <div
                                style={{
                                    width: 64,
                                    height: 1,
                                    backgroundColor: "var(--color-outline)",
                                }}
                            />
                            <div
                                style={{
                                    width: 1,
                                    height: 32,
                                    backgroundColor: "var(--color-outline)",
                                }}
                            />
                            <div
                                className="px-3 py-1 rounded-sm"
                                style={{
                                    border: "1px solid var(--color-outline)",
                                    backgroundColor:
                                        "var(--color-surface-container-high)",
                                    color: "var(--color-on-surface-variant)",
                                    fontSize: 12,
                                    fontFamily: "monospace",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                }}
                            >
                                Edge-West-01
                            </div>
                        </div>

                        {/* Right branch */}
                        <div className="flex flex-col items-center">
                            <div
                                style={{
                                    width: 64,
                                    height: 1,
                                    backgroundColor: "var(--color-outline)",
                                }}
                            />
                            <div
                                style={{
                                    width: 1,
                                    height: 32,
                                    backgroundColor: "var(--color-outline)",
                                }}
                            />
                            <div
                                className="px-3 py-1 rounded-sm"
                                style={{
                                    border: "1px solid var(--color-outline)",
                                    backgroundColor:
                                        "var(--color-surface-container-high)",
                                    color: "var(--color-on-surface-variant)",
                                    fontSize: 12,
                                    fontFamily: "monospace",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                }}
                            >
                                Edge-East-04
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
