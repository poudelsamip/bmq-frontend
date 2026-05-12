export default function Notification() {
    const toggles = [
        {
            title: "Failure alerts",
            desc: "Receive instant push notifications when a job fails.",
            enabled: true,
        },
        {
            title: "Weekly digest",
            desc: "A summary of your infrastructure performance every Monday.",
            enabled: false,
        },
    ];

    return (
        <section className="space-y-5">
            <div className="space-y-1">
                <h3
                    className="text-[20px] font-medium"
                    style={{ color: "var(--color-on-surface)", fontFamily: "Manrope, sans-serif" }}
                >
                    Notifications
                </h3>
                <p className="text-[14px]" style={{ color: "var(--color-on-surface-variant)" }}>
                    Manage how you receive alerts and system updates.
                </p>
            </div>

            <div
                className="rounded overflow-hidden"
                style={{
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {toggles.map((t, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-6 py-5"
                        style={
                            i < toggles.length - 1
                                ? { borderBottom: "1px solid var(--color-outline-variant)" }
                                : {}
                        }
                    >
                        <div className="space-y-1">
                            <p
                                className="text-[14px] font-medium"
                                style={{ color: "var(--color-on-surface)" }}
                            >
                                {t.title}
                            </p>
                            <p
                                className="text-[14px]"
                                style={{ color: "var(--color-on-surface-variant)" }}
                            >
                                {t.desc}
                            </p>
                        </div>

                        {/* Toggle */}
                        <div className="relative w-10 h-5 shrink-0">
                            <div
                                className="w-full h-full rounded-full transition-colors"
                                style={{
                                    background: t.enabled
                                        ? "var(--color-primary)"
                                        : "var(--color-outline-variant)",
                                }}
                            />
                            <div
                                className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                                    t.enabled ? "right-0.5" : "left-0.5"
                                }`}
                                style={{ background: "var(--color-surface-container-lowest)" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
