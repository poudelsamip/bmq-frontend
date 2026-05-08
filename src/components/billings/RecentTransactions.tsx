export default function RecentTransactions() {
    return (
        <section className="space-y-3">
            <h3 className="text-base font-semibold">Recent Transactions</h3>

            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b text-[11px] text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Reference</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {[
                            { date: "Sep 12, 2023", ref: "INV-9823-Q" },
                            { date: "Aug 12, 2023", ref: "INV-8744-Q" },
                        ].map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-300 hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">{row.date}</td>
                                <td className="px-4 py-3 font-mono text-gray-500">
                                    {row.ref}
                                </td>
                                <td className="px-4 py-3 font-medium">$0.00</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-0.5 text-[11px] border rounded text-gray-600">
                                        COMPLETED
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">{"<>"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
