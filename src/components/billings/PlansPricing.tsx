const plans = [
  {
    name: "Free",
    label: null,
    price: "$0",
    period: "/mo",
    description:
      "Essential monitoring tools for personal projects and getting started.",
    features: [
      "2 Projects",
      "Last 30 Jobs",
      "Live Queue Dashboard",
      "Basic Queue Analytics",
      "Standard Support",
    ],
    button: "Current Plan",
    disabled: true,
    highlight: false,
    ghost: false,
  },
  {
    name: "Pro",
    label: "Most Popular",
    price: "$9.99",
    period: "/mo",
    description:
      "Everything you need to monitor, debug, and optimize your BullMQ workloads in production.",
    features: [
      "Unlimited Projects",
      "Complete Job History",
      "Interactive Flow Tree Visualization",
      "Advanced Queue Analytics",
      "Failure Analytics & Insights",
      "Email Alerts for Failed Jobs",
      "Queue Health Monitoring",
      "Priority Support",
    ],
    button: "Upgrade to Pro",
    disabled: false,
    highlight: true,
    ghost: false,
  },
];

export default function PlansPricing() {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[900px] mx-auto mt-8"
            style={{ gap: 24, alignItems: "stretch" }}
        >
            {plans.map((plan, i) => (
                <div
                    key={i}
                    className="group relative flex flex-col rounded-sm transition-all duration-300"
                    style={{
                        backgroundColor: "var(--color-surface-container)",
                        border: plan.highlight
                            ? "1px solid var(--color-primary)"
                            : "1px solid var(--color-outline-variant)",
                        padding: "32px 32px 40px",
                        boxShadow: plan.highlight
                            ? "0 32px 64px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px color-mix(in srgb, var(--color-primary) 30%, transparent)"
                            : "0 12px 32px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                        transform: plan.highlight ? "scale(1.02)" : "scale(1)",
                        zIndex: 1,
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.zIndex = "10";
                        if (!plan.highlight) {
                            el.style.borderColor = "var(--color-outline)";
                            el.style.transform = "translateY(-4px)";
                            el.style.boxShadow = "0 24px 48px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)";
                        } else {
                            el.style.transform = "scale(1.03) translateY(-2px)";
                            el.style.boxShadow = "0 40px 80px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px color-mix(in srgb, var(--color-primary) 50%, transparent)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.zIndex = "1";
                        if (!plan.highlight) {
                            el.style.borderColor = "var(--color-outline-variant)";
                            el.style.transform = "scale(1)";
                            el.style.boxShadow = "0 12px 32px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)";
                        } else {
                            el.style.transform = "scale(1.02)";
                            el.style.boxShadow = "0 32px 64px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px color-mix(in srgb, var(--color-primary) 30%, transparent)";
                        }
                    }}
                >
                    {/* Subtle gradient background for highlight */}
                    {plan.highlight && (
                        <div 
                            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-20 rounded-sm overflow-hidden"
                            style={{
                                background: "radial-gradient(circle at top right, var(--color-primary), transparent 60%)"
                            }}
                        />
                    )}

                    {/* Most popular badge */}
                    {plan.label && (
                        <div
                            className="absolute left-1/2 -translate-x-1/2 rounded-full uppercase shadow-lg"
                            style={{
                                top: -14,
                                backgroundColor: "var(--color-primary)",
                                color: "var(--color-on-primary)",
                                padding: "6px 16px",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {plan.label}
                        </div>
                    )}

                    {/* Plan header */}
                    <div className="relative z-10" style={{ marginBottom: 32 }}>
                        <h3
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: plan.highlight
                                    ? "var(--color-primary)"
                                    : "var(--color-on-surface)",
                                margin: 0,
                                letterSpacing: "0.02em",
                                textTransform: "uppercase"
                            }}
                        >
                            {plan.name}
                        </h3>
                        <div
                            className="flex items-baseline"
                            style={{ gap: 6, marginTop: 12 }}
                        >
                            <span
                                style={{
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 48,
                                    fontWeight: 800,
                                    lineHeight: "1",
                                    letterSpacing: "-0.03em",
                                    color: "var(--color-on-surface)",
                                }}
                            >
                                {plan.price}
                            </span>
                            <span
                                style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: "var(--color-on-surface-variant)",
                                }}
                            >
                                {plan.period}
                            </span>
                        </div>
                        <p
                            style={{
                                fontSize: 15,
                                color: "var(--color-on-surface-variant)",
                                marginTop: 20,
                                margin: "20px 0 0",
                                lineHeight: "1.6",
                            }}
                        >
                            {plan.description}
                        </p>
                    </div>

                    {/* Features list */}
                    <ul
                        className="flex-1 relative z-10"
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            marginBottom: 40,
                        }}
                    >
                        {plan.features.map((f, idx) => (
                            <li
                                key={idx}
                                className="flex items-center"
                                style={{ gap: 14 }}
                            >
                                <span
                                    className="material-symbols-outlined shrink-0"
                                    style={{
                                        fontSize: 22,
                                        color: plan.highlight ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                                        opacity: plan.highlight ? 1 : 0.7,
                                    }}
                                >
                                    check_circle
                                </span>
                                <span
                                    style={{
                                        fontSize: 15,
                                        color: "var(--color-on-surface)",
                                        fontWeight: 500,
                                    }}
                                >
                                    {f}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA button */}
                    <div className="mt-auto relative z-10">
                        <button
                            disabled={plan.disabled}
                            className={`w-full rounded-sm transition-all duration-300 font-semibold text-[15px] ${plan.disabled ? '' : 'active:scale-[0.98]'}`}
                            style={
                                plan.disabled
                                    ? {
                                          padding: "16px 0",
                                          backgroundColor: "color-mix(in srgb, var(--color-surface-container-highest) 50%, transparent)",
                                          border: "1px solid var(--color-outline-variant)",
                                          color: "var(--color-on-surface-variant)",
                                          opacity: 0.7,
                                          cursor: "not-allowed",
                                      }
                                    : plan.highlight
                                      ? {
                                            padding: "16px 0",
                                            backgroundColor: "var(--color-primary)",
                                            color: "var(--color-on-primary)",
                                            border: "none",
                                            boxShadow: "0 8px 24px -6px color-mix(in srgb, var(--color-primary) 60%, transparent)",
                                        }
                                      : {
                                            padding: "16px 0",
                                            backgroundColor: "transparent",
                                            color: "var(--color-on-surface)",
                                            border: "1px solid var(--color-outline)",
                                        }
                            }
                            onMouseEnter={(e) => {
                                if (plan.disabled) return;
                                const el = e.currentTarget as HTMLElement;
                                if (plan.highlight) {
                                    el.style.filter = "brightness(1.15)";
                                    el.style.boxShadow = "0 12px 32px -6px color-mix(in srgb, var(--color-primary) 70%, transparent)";
                                } else {
                                    el.style.backgroundColor = "var(--color-surface-container-highest)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (plan.disabled) return;
                                const el = e.currentTarget as HTMLElement;
                                el.style.filter = "none";
                                if (plan.highlight) {
                                    el.style.boxShadow = "0 8px 24px -6px color-mix(in srgb, var(--color-primary) 60%, transparent)";
                                } else {
                                    el.style.backgroundColor = "transparent";
                                }
                            }}
                        >
                            {plan.button}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
