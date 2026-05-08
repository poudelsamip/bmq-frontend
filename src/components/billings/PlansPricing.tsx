const plans = [
    {
        name: "Free",
        price: "$0",
        description:
            "Essential tools for individuals and small experimental projects.",
        features: ["Up to 5 Projects", "Basic Analytics", "Standard Support"],
        button: "Current Plan",
        disabled: true,
    },
    {
        name: "Pro",
        price: "$49",
        description: "Advanced metrics and higher limits for growing teams.",
        features: [
            "Unlimited Projects",
            "Advanced Observability",
            "Priority Support",
            "Custom Dashboards",
        ],
        button: "Upgrade to Pro",
        highlight: true,
    },
    {
        name: "Team",
        price: "$199",
        description: "Full governance and multi-region infrastructure support.",
        features: [
            "Everything in Pro",
            "RBAC Controls",
            "Audit Logging",
            "24/7 Dedicated Support",
        ],
        button: "Upgrade to Team",
    },
];

export default function PlansPricing() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
                <div
                    key={i}
                    className={`relative p-4 flex bg-white flex-col rounded border ${
                        plan.highlight
                            ? "border-blue-500 shadow-md"
                            : "border-gray-300"
                    }`}
                >
                    {plan.highlight && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                            Most popular
                        </div>
                    )}

                    <div className="mb-6">
                        <p
                            className={`text-sm ${
                                plan.highlight
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500"
                            }`}
                        >
                            {plan.name}
                        </p>

                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl font-bold">
                                {plan.price}
                            </span>
                            <span className="text-xs text-gray-500">/mo</span>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            {plan.description}
                        </p>
                    </div>

                    <ul className="space-y-2 mb-6 text-sm flex-1">
                        {plan.features.map((f, idx) => (
                            <li key={idx}>✔ {f}</li>
                        ))}
                    </ul>

                    <button
                        disabled={plan.disabled}
                        className={`w-full py-2 text-sm rounded ${
                            plan.disabled
                                ? "border text-gray-400"
                                : plan.highlight
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        {plan.button}
                    </button>
                </div>
            ))}
        </div>
    );
}
