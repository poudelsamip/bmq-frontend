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
                <h3 className="text-[20px] font-medium">Notifications</h3>
                <p className="text-[14px] text-[#5a5f6d]">
                    Manage how you receive alerts and system updates.
                </p>
            </div>

            <div className="bg-white border border-[#b6b8cc] rounded-sm overflow-hidden">
                {toggles.map((t, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-between px-6 py-5 ${
                            i !== toggles.length - 1
                                ? "border-b border-[#b6b8cc]"
                                : ""
                        }`}
                    >
                        <div className="space-y-1">
                            <p className="text-[14px] font-medium text-[#2b2f3a]">
                                {t.title}
                            </p>
                            <p className="text-[14px] text-[#5a5f6d]">
                                {t.desc}
                            </p>
                        </div>

                        {/* Toggle */}
                        <div className="relative w-10 h-5">
                            <div
                                className={`w-full h-full rounded-full transition ${
                                    t.enabled ? "bg-[#0038ff]" : "bg-[#b6b8cc]"
                                }`}
                            />
                            <div
                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
                                    t.enabled ? "right-0.5" : "left-0.5"
                                }`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
