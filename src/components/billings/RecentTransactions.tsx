const transactions = [
    { date: "Sep 12, 2023", ref: "INV-9823-Q", amount: "$0.00", status: "COMPLETED" },
    { date: "Aug 12, 2023", ref: "INV-8744-Q", amount: "$0.00", status: "COMPLETED" },
];

export default function RecentTransactions() {
    return (
        <section style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "30px" }}>
            <h3
                style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--color-on-surface)",
                    margin: 0,
                }}
            >
                Recent Transactions
            </h3>

            <div
                className="overflow-hidden rounded-sm"
                style={{
                    backgroundColor: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
            >
                <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "var(--color-surface-container-high)",
                                borderBottom: "1px solid var(--color-outline-variant)",
                            }}
                        >
                            {["Date", "Reference", "Amount", "Status", ""].map((col, i) => (
                                <th
                                    key={i}
                                    className="uppercase tracking-wider"
                                    style={{
                                        padding: "16px 24px",
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: "0.08em",
                                        color: "var(--color-on-surface-variant)",
                                    }}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody style={{ fontSize: 14 }}>
                        {transactions.map((row, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom:
                                        i < transactions.length - 1
                                            ? "1px solid var(--color-outline-variant)"
                                            : "none",
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) =>
                                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                                        "var(--color-surface-container-highest)")
                                }
                                onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                                        "transparent")
                                }
                            >
                                {/* Date */}
                                <td
                                    style={{
                                        padding: "16px 24px",
                                        color: "var(--color-on-surface)",
                                    }}
                                >
                                    {row.date}
                                </td>

                                {/* Reference */}
                                <td
                                    style={{
                                        padding: "16px 24px",
                                        fontFamily: "monospace",
                                        fontSize: 13,
                                        color: "var(--color-on-surface-variant)",
                                    }}
                                >
                                    {row.ref}
                                </td>

                                {/* Amount */}
                                <td
                                    style={{
                                        padding: "16px 24px",
                                        fontWeight: 500,
                                        color: "var(--color-on-surface)",
                                    }}
                                >
                                    {row.amount}
                                </td>

                                {/* Status badge */}
                                <td style={{ padding: "16px 24px" }}>
                                    <div
                                        className="inline-flex items-center rounded-full uppercase"
                                        style={{
                                            gap: 8,
                                            padding: "4px 12px",
                                            border: "1px solid var(--color-outline-variant)",
                                            backgroundColor:
                                                "var(--color-surface-container-highest)",
                                            fontSize: 10,
                                            fontWeight: 700,
                                            letterSpacing: "0.08em",
                                            color: "var(--color-on-surface-variant)",
                                        }}
                                    >
                                        <div
                                            className="rounded-full"
                                            style={{
                                                width: 6,
                                                height: 6,
                                                backgroundColor: "var(--color-outline)",
                                            }}
                                        />
                                        {row.status}
                                    </div>
                                </td>

                                {/* Download icon */}
                                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                    <span
                                        className="material-symbols-outlined transition-colors cursor-pointer"
                                        style={{
                                            fontSize: 20,
                                            color: "var(--color-on-surface-variant)",
                                        }}
                                        onMouseEnter={(e) =>
                                            ((e.currentTarget as HTMLElement).style.color =
                                                "var(--color-primary)")
                                        }
                                        onMouseLeave={(e) =>
                                            ((e.currentTarget as HTMLElement).style.color =
                                                "var(--color-on-surface-variant)")
                                        }
                                    >
                                        download
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
