const plans = [
    {
        name: "Free",
        label: null,
        price: "$0",
        period: "/mo",
        description: "Essential tools for individuals and small experimental projects.",
        features: ["Up to 5 Projects", "Basic Analytics", "Standard Support"],
        button: "Current Plan",
        disabled: true,
        highlight: false,
        ghost: false,
    },
    {
        name: "Pro",
        label: "Most popular",
        price: "$49",
        period: "/mo",
        description: "Advanced metrics and higher limits for growing teams.",
        features: [
            "Unlimited Projects",
            "Advanced Observability",
            "Priority Support",
            "Custom Dashboards",
        ],
        button: "Upgrade to Pro",
        disabled: false,
        highlight: true,
        ghost: false,
    },
    {
        name: "Team",
        label: null,
        price: "$199",
        period: "/mo",
        description: "Full governance and multi-region infrastructure support.",
        features: [
            "Everything in Pro",
            "RBAC Controls",
            "Audit Logging",
            "24/7 Dedicated Support",
        ],
        button: "Upgrade to Team",
        disabled: false,
        highlight: false,
        ghost: true,
    },
];

export default function PlansPricing() {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 16, alignItems: "start" }}
        >
            {plans.map((plan, i) => (
                <div
                    key={i}
                    className="relative flex flex-col rounded-xl transition-colors"
                    style={{
                        backgroundColor: "var(--color-surface-container)",
                        border: plan.highlight
                            ? "2px solid var(--color-primary)"
                            : "1px solid var(--color-outline-variant)",
                        padding: "32px",
                        marginTop: plan.highlight ? 0 : 8,
                        boxShadow: plan.highlight
                            ? "0 24px 48px rgba(0,0,0,0.4), 0 0 0 4px rgba(183,196,255,0.05)"
                            : "none",
                        transform: plan.highlight ? "translateY(-8px)" : "none",
                    }}
                    onMouseEnter={(e) => {
                        if (!plan.highlight)
                            (e.currentTarget as HTMLElement).style.borderColor =
                                "rgba(183, 196, 255, 0.50)";
                    }}
                    onMouseLeave={(e) => {
                        if (!plan.highlight)
                            (e.currentTarget as HTMLElement).style.borderColor =
                                "var(--color-outline-variant)";
                    }}
                >
                    {/* Most popular badge */}
                    {plan.label && (
                        <div
                            className="absolute left-1/2 -translate-x-1/2 rounded-full uppercase"
                            style={{
                                top: -12,
                                backgroundColor: "var(--color-primary)",
                                color: "var(--color-on-primary)",
                                padding: "4px 12px",
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {plan.label}
                        </div>
                    )}

                    {/* Plan header */}
                    <div style={{ marginBottom: 32 }}>
                        <p
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: plan.highlight
                                    ? "var(--color-primary)"
                                    : "var(--color-on-surface-variant)",
                                margin: 0,
                            }}
                        >
                            {plan.name}
                        </p>
                        <div
                            className="flex items-baseline"
                            style={{ gap: 4, marginTop: 8 }}
                        >
                            <span
                                style={{
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 32,
                                    fontWeight: 700,
                                    lineHeight: "40px",
                                    letterSpacing: "-0.02em",
                                    color: "var(--color-on-surface)",
                                }}
                            >
                                {plan.price}
                            </span>
                            <span
                                style={{
                                    fontSize: 14,
                                    color: "var(--color-on-surface-variant)",
                                }}
                            >
                                {plan.period}
                            </span>
                        </div>
                        <p
                            style={{
                                fontSize: 14,
                                color: "var(--color-on-surface-variant)",
                                marginTop: 16,
                                margin: "16px 0 0",
                                lineHeight: "20px",
                            }}
                        >
                            {plan.description}
                        </p>
                    </div>

                    {/* Features list */}
                    <ul
                        className="flex-1"
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            marginBottom: 32,
                        }}
                    >
                        {plan.features.map((f, idx) => (
                            <li
                                key={idx}
                                className="flex items-center"
                                style={{ gap: 12 }}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={{
                                        fontSize: 20,
                                        color: "var(--color-primary)",
                                        flexShrink: 0,
                                    }}
                                >
                                    check_circle
                                </span>
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: "var(--color-on-surface)",
                                    }}
                                >
                                    {f}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA button */}
                    <button
                        disabled={plan.disabled}
                        className="w-full rounded-xl transition-all active:scale-[0.98]"
                        style={
                            plan.disabled
                                ? {
                                      padding: "12px 0",
                                      border: "1px solid var(--color-outline-variant)",
                                      color: "var(--color-on-surface-variant)",
                                      backgroundColor: "transparent",
                                      fontSize: 13,
                                      fontWeight: 600,
                                      opacity: 0.4,
                                      cursor: "default",
                                  }
                                : plan.highlight
                                  ? {
                                        padding: "12px 0",
                                        backgroundColor: "var(--color-primary)",
                                        color: "var(--color-on-primary)",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(183,196,255,0.25)",
                                    }
                                  : {
                                        padding: "12px 0",
                                        backgroundColor: "rgba(183, 196, 255, 0.20)",
                                        color: "var(--color-primary)",
                                        border: "1px solid rgba(183, 196, 255, 0.30)",
                                        fontSize: 13,
                                        fontWeight: 600,
                                    }
                        }
                        onMouseEnter={(e) => {
                            if (plan.highlight)
                                (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
                            if (plan.ghost)
                                Object.assign((e.currentTarget as HTMLElement).style, {
                                    backgroundColor: "var(--color-primary)",
                                    color: "var(--color-on-primary)",
                                });
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.filter = "";
                            if (plan.ghost)
                                Object.assign((e.currentTarget as HTMLElement).style, {
                                    backgroundColor: "rgba(183, 196, 255, 0.20)",
                                    color: "var(--color-primary)",
                                });
                        }}
                    >
                        {plan.button}
                    </button>
                </div>
            ))}
        </div>
    );
}
