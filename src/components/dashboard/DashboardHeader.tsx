interface DashboardHeaderProps {
    title: string;
    onCreateJob?: () => void;
}

export default function DashboardHeader({ title, onCreateJob }: DashboardHeaderProps) {
    return (
        <header
            className="fixed top-0 right-0 h-16 flex items-center justify-between px-6 z-10"
            style={{
                left: 220,
                backgroundColor: "rgba(19, 18, 28, 0.90)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--color-outline-variant)",
            }}
        >
            {/* Page title */}
            <div className="flex items-center gap-4">
                <h2
                    style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 20,
                        fontWeight: 600,
                        color: "var(--color-on-surface)",
                        lineHeight: 1,
                    }}
                >
                    {title}
                </h2>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
                        style={{ color: "var(--color-on-surface-variant)" }}
                        aria-label="Notifications"
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "var(--color-primary)")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)")
                        }
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                            notifications
                        </span>
                    </button>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
                        style={{ color: "var(--color-on-surface-variant)" }}
                        aria-label="Help"
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "var(--color-primary)")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)")
                        }
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                            help_outline
                        </span>
                    </button>
                </div>

                <button
                    onClick={onCreateJob}
                    className="px-6 py-2 rounded-lg text-sm font-medium transition-all active:scale-95"
                    style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        boxShadow: "0 4px 14px rgba(183, 196, 255, 0.20)",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.filter = "brightness(1.1)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.filter = "")
                    }
                >
                    Create Job
                </button>
            </div>
        </header>
    );
}
