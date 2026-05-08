export default function CurrentPlan() {
    return (
        <section className="bg-white border border-gray-200 p-4 rounded shadow-sm">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-500">
                        Current Plan
                    </span>
                    <h3 className="text-lg font-semibold">Free Tier</h3>
                    <p className="text-sm text-gray-500">
                        Your current billing cycle ends on Oct 12, 2023.
                    </p>
                </div>

                <div className="flex-1 max-w-sm w-full">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">Projects: 2 / 5</span>
                        <span className="text-gray-500">40%</span>
                    </div>

                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[40%]" />
                    </div>
                </div>

                <button className="border border-blue-600 text-blue-600 px-3 py-1.5 text-sm rounded hover:bg-blue-50">
                    Manage Plan
                </button>
            </div>
        </section>
    );
}
